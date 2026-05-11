"use client";

import { useFormState, useFormStatus } from "react-dom";
import { cadastrarAluno, type CadastroAlunoState } from "@/actions/aluno.actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Instituicao = { id: string; nome: string };

const initialState: CadastroAlunoState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-gradient-to-r from-[#f0c040] to-[#c9a227] px-4 py-2.5 text-[#0d2b1a] font-semibold hover:from-[#d4a017] hover:to-[#b8901f] disabled:opacity-50 transition shadow-md"
    >
      {pending ? "Cadastrando..." : "Criar conta"}
    </button>
  );
}

export function CadastroAlunoForm({ instituicoes }: { instituicoes: Instituicao[] }) {
  const [state, action] = useFormState(cadastrarAluno, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/login?cadastro=ok");
    }
  }, [state.success, router]);

  function FieldError({ field }: { field: keyof NonNullable<CadastroAlunoState["errors"]> }) {
    const msgs = state.errors?.[field];
    if (!msgs) return null;
    return <p className="mt-1 text-xs text-red-600">{msgs[0]}</p>;
  }

  return (
    <form action={action} className="space-y-4">
      {state.errors?._form && (
        <div className="rounded bg-red-50 p-3 text-sm text-red-600">
          {state.errors._form[0]}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Nome completo</label>
          <input name="nome" type="text" required className="input-field" />
          <FieldError field="nome" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="email" type="email" required className="input-field" />
          <FieldError field="email" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input name="senha" type="password" required className="input-field" />
          <FieldError field="senha" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CPF (só números)</label>
          <input name="cpf" type="text" maxLength={11} required className="input-field" />
          <FieldError field="cpf" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">RG</label>
          <input name="rg" type="text" required className="input-field" />
          <FieldError field="rg" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Endereço</label>
          <input name="endereco" type="text" required className="input-field" />
          <FieldError field="endereco" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Curso</label>
          <input name="curso" type="text" required className="input-field" />
          <FieldError field="curso" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Instituição</label>
          <select name="instituicaoId" required className="input-field">
            <option value="">Selecione...</option>
            {instituicoes.map((i) => (
              <option key={i.id} value={i.id}>
                {i.nome}
              </option>
            ))}
          </select>
          <FieldError field="instituicaoId" />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
