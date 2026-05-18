"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AlunoService } from "@/services/aluno.service";
import { QueueService } from "@/services/queue.service";
import { prisma } from "@/lib/prisma";

// ─── US01: Cadastro de Aluno ──────────────────────────────────

const CadastroAlunoSchema = z.object({
  nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
  cpf: z
    .string()
    .length(11, "CPF deve ter 11 dígitos")
    .regex(/^\d+$/, "CPF deve conter apenas números"),
  rg: z.string().min(7, "RG inválido"),
  endereco: z.string().min(5, "Endereço muito curto"),
  curso: z.string().min(2, "Curso inválido"),
  instituicaoId: z.string().cuid("Instituição inválida"),
});

export type CadastroAlunoState = {
  errors?: Partial<Record<keyof z.infer<typeof CadastroAlunoSchema> | "_form", string[]>>;
  success?: boolean;
};

export async function cadastrarAluno(
  _prevState: CadastroAlunoState,
  formData: FormData
): Promise<CadastroAlunoState> {
  const parsed = CadastroAlunoSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await AlunoService.cadastrar(parsed.data);
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error && err.message.includes("Unique")
        ? "Email ou CPF já cadastrado."
        : "Erro ao cadastrar. Tente novamente.";
    return { errors: { _form: [message] } };
  }
}

// ─── US05 + US06: Resgate de Vantagem ────────────────────────

export type ResgateState = {
  error?: string;
  success?: boolean;
  codigoCupom?: string;
};

export async function resgataVantagem(
  vantagemId: string
): Promise<ResgateState> {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ALUNO" || !session.user.alunoId) {
    return { error: "Não autorizado." };
  }

  try {
    const { codigoCupom, vantagem } = await AlunoService.trocarMoedas({
      alunoId: session.user.alunoId,
      vantagemId,
    });

    // 1. Busca aluno e empresa para montar o payload do email
    const [aluno, empresa] = await Promise.all([
      prisma.aluno.findUniqueOrThrow({
        where: { id: session.user.alunoId },
        include: { user: true },
      }),
      prisma.empresaParceira.findUniqueOrThrow({
        where: { id: vantagem.empresaId },
        include: { user: true },
      }),
    ]);

    // 2. US06 / US07 — Publica evento na fila (envia cupom ao aluno + aviso à empresa)
    await QueueService.publishEmailResgate({
      emailAluno: aluno.user.email,
      nomeAluno: aluno.nome,
      emailEmpresa: empresa.user.email,
      nomeEmpresa: empresa.nome,
      nomeVantagem: vantagem.descricao,
      codigoCupom,
    });

    revalidatePath("/aluno");
    return { success: true, codigoCupom };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Erro ao resgatar vantagem.";
    return { error: message };
  }
}