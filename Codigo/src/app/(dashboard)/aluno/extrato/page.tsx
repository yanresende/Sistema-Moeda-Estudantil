import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AlunoService } from "@/services/aluno.service";
import { ArrowDownLeft, ArrowUpRight, Wallet, ReceiptText } from "lucide-react";

export default async function ExtratoAlunoPage() {
  const session = await getServerSession(authOptions);
  const conta = await AlunoService.consultarExtrato(session!.user.alunoId!);

  const todasTransacoes = [
    ...(conta?.transacoesRecebidas ?? []).map((t) => ({ ...t, direcao: "entrada" as const })),
    ...(conta?.transacoesEnviadas ?? []).map((t) => ({ ...t, direcao: "saida" as const })),
  ].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const saldo = conta?.saldo ?? 0;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between page-header">
        <div>
          <h1 className="page-title">Extrato</h1>
          <p className="page-subtitle">Histórico completo de moedas recebidas e resgates.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 ring-1 ring-amber-200">
          <Wallet size={16} className="text-amber-600" />
          <div>
            <p className="text-xs text-slate-500">Saldo atual</p>
            <p className="text-sm font-bold text-amber-700">{saldo} moedas</p>
          </div>
        </div>
      </div>

      {/* Transações */}
      {todasTransacoes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
          <ReceiptText size={40} className="mb-3 text-slate-300" />
          <p className="font-semibold text-slate-600">Nenhuma transação ainda</p>
          <p className="mt-1 text-sm text-slate-400">Suas transações aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todasTransacoes.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow"
            >
              {/* Icon */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  t.direcao === "entrada"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {t.direcao === "entrada" ? (
                  <ArrowDownLeft size={20} />
                ) : (
                  <ArrowUpRight size={20} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="truncate font-semibold text-slate-900 text-sm">
                  {t.tipo === "ENVIO"
                    ? "Moedas recebidas"
                    : `Resgate: ${(t as any).vantagem?.descricao ?? "Vantagem"}`}
                </p>
                {t.motivo && (
                  <p className="mt-0.5 truncate text-xs text-slate-500">{t.motivo}</p>
                )}
                {t.codigoCupom && (
                  <span className="mt-1 inline-flex items-center rounded bg-green-50 px-2 py-0.5 font-mono text-xs font-bold text-green-700 ring-1 ring-green-200">
                    Cupom: {t.codigoCupom}
                  </span>
                )}
              </div>

              {/* Right side */}
              <div className="shrink-0 text-right">
                <p
                  className={`text-base font-bold ${
                    t.direcao === "entrada" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {t.direcao === "entrada" ? "+" : "−"}
                  {t.valor}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(t.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
