"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { EmpresaService } from "@/services/empresa.service";

// ─── Cadastro de Empresa Parceira ─────────────────────────────

const CadastroEmpresaSchema = z.object({
  nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
});

export type CadastroEmpresaState = {
  errors?: Partial<Record<keyof z.infer<typeof CadastroEmpresaSchema> | "_form", string[]>>;
  success?: boolean;
};

export async function cadastrarEmpresa(
  _prevState: CadastroEmpresaState,
  formData: FormData
): Promise<CadastroEmpresaState> {
  const parsed = CadastroEmpresaSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await EmpresaService.cadastrar(parsed.data);
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error && err.message.includes("Unique")
        ? "Email já cadastrado."
        : "Erro ao cadastrar. Tente novamente.";
    return { errors: { _form: [message] } };
  }
}

// ─── US04: Cadastro de Vantagem ───────────────────────────────

const CadastroVantagemSchema = z.object({
  descricao: z.string().min(5, "Descrição muito curta").max(300),
  foto: z.string().url("URL da foto inválida").optional().or(z.literal("")),
  custoMoedas: z.coerce
    .number({ invalid_type_error: "Informe um número" })
    .int("Deve ser um número inteiro")
    .positive("O custo deve ser positivo"),
});

export type CadastroVantagemState = {
  errors?: Partial<Record<keyof z.infer<typeof CadastroVantagemSchema> | "_form", string[]>>;
  success?: boolean;
};

export async function cadastrarVantagem(
  _prevState: CadastroVantagemState,
  formData: FormData
): Promise<CadastroVantagemState> {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "EMPRESA" || !session.user.empresaId) {
    return { errors: { _form: ["Não autorizado."] } };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = CadastroVantagemSchema.safeParse(raw);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await EmpresaService.cadastrarVantagem({
      empresaId: session.user.empresaId,
      descricao: parsed.data.descricao,
      foto: parsed.data.foto || undefined,
      custoMoedas: parsed.data.custoMoedas,
    });

    revalidatePath("/empresa/vantagens");
    return { success: true };
  } catch {
    return { errors: { _form: ["Erro ao cadastrar vantagem. Tente novamente."] } };
  }
}