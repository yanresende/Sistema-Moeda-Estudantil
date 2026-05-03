"use client";

import { useFormState, useFormStatus } from "react-dom";
import { cadastrarVantagem, type CadastroVantagemState } from "@/actions/empresa.actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialState: CadastroVantagemState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-green-600 px-6 py-2 text-white font-medium hover:bg-green-700 disabled:opacity-50 transition"
    >
      {pending ? "Salvando..." : "Cadastrar vantagem"}
    </button>
  );
}

export function CadastroVantagemForm() {
  const [state, action] = useFormState(cadastrarVantagem, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/empresa/vantagens");
    }
  }, [state.success, router]);

  return (
    <form action={action} className="space-y-5 max-w-md">
      {state.errors?._form && (
        <div className="rounded bg-red-50 p-3 text-sm text-red-600">
          {state.errors._form[0]}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição da vantagem</label>
        <textarea
          name="descricao"
          rows={3}
          required
          className="mt-1 input-field"
          placeholder="Ex: 20% de desconto em produtos selecionados"
        />
        {state.errors?.descricao && (
          <p className="mt-1 text-xs text-red-600">{state.errors.descricao[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL da foto <span className="text-gray-400 text-xs">(opcional)</span>
        </label>
        <input
          name="foto"
          type="url"
          className="mt-1 input-field"
          placeholder="https://exemplo.com/foto.jpg"
        />
        {state.errors?.foto && (
          <p className="mt-1 text-xs text-red-600">{state.errors.foto[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Custo em moedas</label>
        <input
          name="custoMoedas"
          type="number"
          min={1}
          required
          className="mt-1 input-field"
          placeholder="Ex: 50"
        />
        {state.errors?.custoMoedas && (
          <p className="mt-1 text-xs text-red-600">{state.errors.custoMoedas[0]}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
