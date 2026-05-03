"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { EmpresaService } from "@/services/empresa.service";

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
