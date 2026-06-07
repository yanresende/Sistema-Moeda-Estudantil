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
      className="btn-green w-full"
    >
      {pending ? "Criando conta..." : "Criar minha conta"}
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
    <form action={action} className="space-y-5">
      {state.errors?._form && (
        <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600 ring-1 ring-red-200">
          {state.errors._form[0]}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700">Nome completo</label>
        <input name="nome" type="text" required placeholder="Seu nome completo" className="input-field" />
        <FieldError field="nome" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input name="email" type="email" required placeholder="seu@email.com" className="input-field" />
        <FieldError field="email" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Senha</label>
        <input name="senha" type="password" required placeholder="Mínimo 6 caracteres" className="input-field" />
        <FieldError field="senha" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">CPF (só números)</label>
          <input name="cpf" type="text" maxLength={11} required placeholder="00000000000" className="input-field" />
          <FieldError field="cpf" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">RG</label>
          <input name="rg" type="text" required placeholder="00.000.000-0" className="input-field" />
          <FieldError field="rg" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Endereço</label>
        <input name="endereco" type="text" required placeholder="Rua, número, bairro, cidade" className="input-field" />
        <FieldError field="endereco" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Curso</label>
          <input name="curso" type="text" required placeholder="Ex: Engenharia" className="input-field" />
          <FieldError field="curso" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Instituição</label>
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

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
