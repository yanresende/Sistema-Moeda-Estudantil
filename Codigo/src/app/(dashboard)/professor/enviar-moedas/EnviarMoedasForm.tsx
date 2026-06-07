"use client";

import { useFormState, useFormStatus } from "react-dom";
import { enviarMoedas, type EnviarMoedasState } from "@/actions/professor.actions";
import { CheckCircle2, AlertCircle } from "lucide-react";

type Aluno = { id: string; nome: string; curso: string };

const initialState: EnviarMoedasState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full"
    >
      {pending ? "Enviando moedas..." : "Enviar moedas"}
    </button>
  );
}

export function EnviarMoedasForm({ alunos }: { alunos: Aluno[] }) {
  const [state, action] = useFormState(enviarMoedas, initialState);

  return (
    <form action={action} className="space-y-5">
      {state.errors?._form && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600 ring-1 ring-red-200">
          <AlertCircle size={14} className="shrink-0" />
          {state.errors._form[0]}
        </div>
      )}

      {state.success && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700 ring-1 ring-green-200">
          <CheckCircle2 size={14} className="shrink-0" />
          Moedas enviadas com sucesso!
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700">Aluno</label>
        <select name="alunoId" required className="input-field">
          <option value="">Selecione o aluno...</option>
          {alunos.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nome} — {a.curso}
            </option>
          ))}
        </select>
        {state.errors?.alunoId && (
          <p className="mt-1 text-xs text-red-600">{state.errors.alunoId[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Quantidade de moedas
        </label>
        <input
          name="quantidade"
          type="number"
          min={1}
          required
          className="input-field"
          placeholder="Ex: 10"
        />
        {state.errors?.quantidade && (
          <p className="mt-1 text-xs text-red-600">{state.errors.quantidade[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Motivo{" "}
          <span className="font-normal text-slate-400">(mín. 10 caracteres)</span>
        </label>
        <textarea
          name="motivo"
          rows={3}
          required
          className="input-field resize-none"
          placeholder="Descreva o motivo do reconhecimento..."
        />
        {state.errors?.motivo && (
          <p className="mt-1 text-xs text-red-600">{state.errors.motivo[0]}</p>
        )}
      </div>

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
