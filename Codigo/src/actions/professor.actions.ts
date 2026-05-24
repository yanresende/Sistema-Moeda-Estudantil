"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ProfessorService } from "@/services/professor.service";
import { publishToQueue } from "@/lib/rabbitmq";
import { Queues } from "@/lib/queues";
import { prisma } from "@/lib/prisma";

// ─── US02: Envio de Moedas ────────────────────────────────────

const EnviarMoedasSchema = z.object({
  alunoId: z.string().cuid("Aluno inválido"),
  quantidade: z.coerce
    .number({ invalid_type_error: "Informe um número" })
    .int("Deve ser um número inteiro")
    .positive("A quantidade deve ser positiva"),
  motivo: z
    .string()
    .min(10, "O motivo deve ter ao menos 10 caracteres")
    .max(500, "Motivo muito longo"),
});

export type EnviarMoedasState = {
  errors?: Partial<Record<keyof z.infer<typeof EnviarMoedasSchema> | "_form", string[]>>;
  success?: boolean;
};

export async function enviarMoedas(
  _prevState: EnviarMoedasState,
  formData: FormData
): Promise<EnviarMoedasState> {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "PROFESSOR" || !session.user.professorId) {
    return { errors: { _form: ["Não autorizado."] } };
  }

  const parsed = EnviarMoedasSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await ProfessorService.enviarMoedas({
      professorId: session.user.professorId,
      alunoId: parsed.data.alunoId,
      quantidade: parsed.data.quantidade,
      motivo: parsed.data.motivo,
    });

    // US03 — Notificar aluno por email ao receber moedas
    const [aluno, professor] = await Promise.all([
      prisma.aluno.findUnique({
        where: { id: parsed.data.alunoId },
        include: { user: true },
      }),
      prisma.professor.findUnique({
        where: { id: session.user.professorId },
      }),
    ]);

    if (aluno && professor) {
      publishToQueue(Queues.EMAIL_MOEDAS_RECEBIDAS, {
        emailAluno:    aluno.user.email,
        nomeAluno:     aluno.nome,
        nomeProfessor: professor.nome,
        quantidade:    parsed.data.quantidade,
        motivo:        parsed.data.motivo,
      }).catch((err) => console.error("[enviarMoedas] fila indisponível:", err));
    }

    revalidatePath("/professor");
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Erro ao enviar moedas.";
    return { errors: { _form: [message] } };
  }
}