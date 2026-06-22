"use client";

import { useState, useTransition } from "react";
import { resgataVantagem } from "@/actions/aluno.actions";
import { ShoppingBag, CheckCircle2, AlertCircle, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export function ResgateButton({ vantagemId }: { vantagemId: string }) {
  const [isPending, startTransition] = useTransition();
  const [resultado, setResultado] = useState<{ cupom?: string; erro?: string } | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  function handleResgate() {
    startTransition(async () => {
      const res = await resgataVantagem(vantagemId);
      if (res.success && res.codigoCupom) {
        setResultado({ cupom: res.codigoCupom });
        setModalAberto(true);
      } else {
        setResultado({ erro: res.error });
      }
    });
  }

  return (
    <>
      <div className="text-right space-y-1">
        {resultado?.cupom && !modalAberto && (
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600 mb-1">
              <CheckCircle2 size={12} />
              Resgatado!
            </div>
            <button
              onClick={() => setModalAberto(true)}
              className="rounded bg-green-50 px-2 py-1 font-mono text-xs font-bold text-green-700 ring-1 ring-green-200 hover:bg-green-100 transition-colors"
            >
              {resultado.cupom} — ver QR Code
            </button>
          </div>
        )}

        {resultado?.erro && (
          <div className="flex items-center gap-1 text-xs text-red-600">
            <AlertCircle size={12} />
            <span>{resultado.erro}</span>
          </div>
        )}

        {!resultado?.cupom && (
          <button
            onClick={handleResgate}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:from-amber-600 hover:to-amber-700 disabled:opacity-50"
          >
            <ShoppingBag size={13} />
            {isPending ? "Resgatando..." : "Resgatar"}
          </button>
        )}
      </div>

      {modalAberto && resultado?.cupom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setModalAberto(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 max-w-xs w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalAberto(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 size={20} />
              <span className="font-semibold text-sm">Vantagem Resgatada!</span>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Apresente este QR Code na empresa para validar seu benefício.
            </p>

            <div className="p-3 bg-white rounded-xl ring-1 ring-gray-200 shadow-sm">
              <QRCodeSVG
                value={resultado.cupom}
                size={180}
                level="M"
                includeMargin={false}
              />
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-gray-400">Código do cupom</span>
              <span className="font-mono text-sm font-bold text-gray-800 tracking-widest bg-gray-50 px-3 py-1.5 rounded-lg ring-1 ring-gray-200">
                {resultado.cupom}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
