"use client";

import { useState, useTransition } from "react";
import { resgataVantagem } from "@/actions/aluno.actions";

export function ResgateButton({ vantagemId }: { vantagemId: string }) {
  const [isPending, startTransition] = useTransition();
  const [resultado, setResultado] = useState<{ cupom?: string; erro?: string } | null>(null);

  function handleResgate() {
    startTransition(async () => {
      const res = await resgataVantagem(vantagemId);
      if (res.success && res.codigoCupom) {
        setResultado({ cupom: res.codigoCupom });
      } else {
        setResultado({ erro: res.error });
      }
    });
  }

  if (resultado?.cupom) {
    return (
      <div className="text-center">
        <p className="text-xs text-[#1a5c2a] font-medium">Resgatado!</p>
        <p className="font-mono font-bold text-[#c9a227]">{resultado.cupom}</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {resultado?.erro && (
        <p className="text-xs text-red-600">{resultado.erro}</p>
      )}
      <button
        onClick={handleResgate}
        disabled={isPending}
        className="rounded-md bg-gradient-to-r from-[#f0c040] to-[#c9a227] px-3 py-1.5 text-sm font-semibold text-[#0d2b1a] hover:from-[#d4a017] hover:to-[#b8901f] disabled:opacity-50 transition shadow-sm"
      >
        {isPending ? "Resgatando..." : "Resgatar"}
      </button>
    </div>
  );
}
