"use client";

import { useFormState, useFormStatus } from "react-dom";
import { cadastrarVantagem, type CadastroVantagemState } from "@/actions/empresa.actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

const initialState: CadastroVantagemState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full"
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
    <form action={action} className="space-y-5">
      {state.errors?._form && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600 ring-1 ring-red-200">
          <AlertCircle size={14} className="shrink-0" />
          {state.errors._form[0]}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Descrição da vantagem
        </label>
        <textarea
          name="descricao"
          rows={3}
          required
          className="input-field resize-none"
          placeholder="Ex: 20% de desconto em produtos selecionados"
        />
        {state.errors?.descricao && (
          <p className="mt-1 text-xs text-red-600">{state.errors.descricao[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          URL da foto{" "}
          <span className="text-slate-400 font-normal">(opcional)</span>
        </label>
        <input
          name="foto"
          type="url"
          className="input-field"
          placeholder="https://exemplo.com/imagem.jpg"
        />
        {state.errors?.foto && (
          <p className="mt-1 text-xs text-red-600">{state.errors.foto[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Custo em moedas
        </label>
        <input
          name="custoMoedas"
          type="number"
          min={1}
          required
          className="input-field"
          placeholder="Ex: 50"
        />
        {state.errors?.custoMoedas && (
          <p className="mt-1 text-xs text-red-600">{state.errors.custoMoedas[0]}</p>
        )}
      </div>

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
