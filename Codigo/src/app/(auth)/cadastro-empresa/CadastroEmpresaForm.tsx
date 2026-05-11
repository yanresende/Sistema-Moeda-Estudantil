"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cadastrarEmpresa, type CadastroEmpresaState } from "@/actions/empresa.actions";

const initialState: CadastroEmpresaState = {};

export function CadastroEmpresaForm() {
  const [state, formAction, isPending] = useActionState(cadastrarEmpresa, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/login?cadastro=empresa");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-4">
      {state.errors?._form && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {state.errors._form.join(", ")}
        </div>
      )}

      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome da empresa
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-amber-300 px-3 py-2 text-sm shadow-sm focus:border-[#1a5c2a] focus:outline-none focus:ring-1 focus:ring-[#1a5c2a] bg-white"
        />
        {state.errors?.nome && (
          <p className="mt-1 text-xs text-red-600">{state.errors.nome[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border border-amber-300 px-3 py-2 text-sm shadow-sm focus:border-[#1a5c2a] focus:outline-none focus:ring-1 focus:ring-[#1a5c2a] bg-white"
        />
        {state.errors?.email && (
          <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          id="senha"
          name="senha"
          type="password"
          required
          className="mt-1 block w-full rounded-md border border-amber-300 px-3 py-2 text-sm shadow-sm focus:border-[#1a5c2a] focus:outline-none focus:ring-1 focus:ring-[#1a5c2a] bg-white"
        />
        {state.errors?.senha && (
          <p className="mt-1 text-xs text-red-600">{state.errors.senha[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-gradient-to-r from-[#f0c040] to-[#c9a227] px-4 py-2.5 text-[#0d2b1a] font-semibold hover:from-[#d4a017] hover:to-[#b8901f] disabled:opacity-50 transition shadow-md"
      >
        {isPending ? "Cadastrando..." : "Cadastrar empresa"}
      </button>
    </form>
  );
}
