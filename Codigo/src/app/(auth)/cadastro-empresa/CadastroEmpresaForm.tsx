"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cadastrarEmpresa, type CadastroEmpresaState } from "@/actions/empresa.actions";
import { AlertCircle } from "lucide-react";

const initialState: CadastroEmpresaState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full"
    >
      {pending ? "Cadastrando..." : "Cadastrar empresa"}
    </button>
  );
}

export function CadastroEmpresaForm() {
  const [state, formAction] = useFormState(cadastrarEmpresa, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/login?cadastro=empresa");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-5">
      {state.errors?._form && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600 ring-1 ring-red-200">
          <AlertCircle size={14} className="shrink-0" />
          {state.errors._form.join(", ")}
        </div>
      )}

      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-slate-700">
          Nome da empresa
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          placeholder="Ex: Livraria Central"
          className="input-field"
        />
        {state.errors?.nome && (
          <p className="mt-1 text-xs text-red-600">{state.errors.nome[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email corporativo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="contato@empresa.com"
          className="input-field"
        />
        {state.errors?.email && (
          <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="senha" className="block text-sm font-medium text-slate-700">
          Senha
        </label>
        <input
          id="senha"
          name="senha"
          type="password"
          required
          placeholder="Mínimo 6 caracteres"
          className="input-field"
        />
        {state.errors?.senha && (
          <p className="mt-1 text-xs text-red-600">{state.errors.senha[0]}</p>
        )}
      </div>

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
