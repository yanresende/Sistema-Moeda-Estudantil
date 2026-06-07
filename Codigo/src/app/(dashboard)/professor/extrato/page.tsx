import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ProfessorService } from "@/services/professor.service";
import { Send, Wallet, ReceiptText } from "lucide-react";

export default async function ExtratoProfessorPage() {
  const session = await getServerSession(authOptions);
  const conta = await ProfessorService.consultarExtrato(session!.user.professorId!);

  const envios = conta?.transacoesEnviadas ?? [];
  const saldo = conta?.saldo ?? 0;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between page-header">
        <div>
          <h1 className="page-title">Extrato de Envios</h1>
          <p className="page-subtitle">Histórico de moedas distribuídas aos alunos.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 ring-1 ring-green-200">
          <Wallet size={16} className="text-green-600" />
          <div>
            <p className="text-xs text-slate-500">Saldo restante</p>
            <p className="text-sm font-bold text-green-700">{saldo} moedas</p>
          </div>
        </div>
      </div>

      {/* Envios */}
      {envios.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
          <ReceiptText size={40} className="mb-3 text-slate-300" />
          <p className="font-semibold text-slate-600">Nenhum envio realizado ainda</p>
          <p className="mt-1 text-sm text-slate-400">Seus envios de moedas aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {envios.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow"
            >
              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Send size={18} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="truncate font-semibold text-slate-900 text-sm">
                  Para: {t.contaDestino?.aluno?.nome ?? "Aluno"}
                </p>
                {t.motivo && (
                  <p className="mt-0.5 truncate text-xs text-slate-500">{t.motivo}</p>
                )}
              </div>

              {/* Right side */}
              <div className="shrink-0 text-right">
                <p className="text-base font-bold text-amber-600">
                  −{t.valor}
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
