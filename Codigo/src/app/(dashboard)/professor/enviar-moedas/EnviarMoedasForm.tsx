"use client";

import { useFormState, useFormStatus } from "react-dom";
import { enviarMoedas, type EnviarMoedasState } from "@/actions/professor.actions";

type Aluno = { id: string; nome: string; curso: string };

const initialState: EnviarMoedasState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
    >
      {pending ? "Enviando..." : "Enviar moedas"}
    </button>
  );
}

export function EnviarMoedasForm({ alunos }: { alunos: Aluno[] }) {
  const [state, action] = useFormState(enviarMoedas, initialState);

  return (
    <form action={action} className="space-y-5 max-w-md">
      {state.errors?._form && (
        <div className="rounded bg-red-50 p-3 text-sm text-red-600">
          {state.errors._form[0]}
        </div>
      )}
      {state.success && (
        <div className="rounded bg-green-50 p-3 text-sm text-green-600">
          Moedas enviadas com sucesso!
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Aluno</label>
        <select name="alunoId" required className="mt-1 input-field">
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
        <label className="block text-sm font-medium text-gray-700">Quantidade de moedas</label>
        <input
          name="quantidade"
          type="number"
          min={1}
          required
          className="mt-1 input-field"
          placeholder="Ex: 10"
        />
        {state.errors?.quantidade && (
          <p className="mt-1 text-xs text-red-600">{state.errors.quantidade[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Motivo <span className="text-gray-400 text-xs">(obrigatório — mín. 10 caracteres)</span>
        </label>
        <textarea
          name="motivo"
          rows={3}
          required
          className="mt-1 input-field"
          placeholder="Descreva o motivo do reconhecimento..."
        />
        {state.errors?.motivo && (
          <p className="mt-1 text-xs text-red-600">{state.errors.motivo[0]}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
