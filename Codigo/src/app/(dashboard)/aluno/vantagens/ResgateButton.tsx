"use client";

import { useState, useTransition } from "react";
import { resgataVantagem } from "@/actions/aluno.actions";
import { ShoppingBag, CheckCircle2, AlertCircle } from "lucide-react";

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
      <div className="text-right">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600 mb-1">
          <CheckCircle2 size={12} />
          Resgatado!
        </div>
        <p className="rounded bg-green-50 px-2 py-1 font-mono text-xs font-bold text-green-700 ring-1 ring-green-200">
          {resultado.cupom}
        </p>
      </div>
    );
  }

  return (
    <div className="text-right space-y-1">
      {resultado?.erro && (
        <div className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle size={12} />
          <span>{resultado.erro}</span>
        </div>
      )}
      <button
        onClick={handleResgate}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:from-amber-600 hover:to-amber-700 disabled:opacity-50"
      >
        <ShoppingBag size={13} />
        {isPending ? "Resgatando..." : "Resgatar"}
      </button>
    </div>
  );
}
