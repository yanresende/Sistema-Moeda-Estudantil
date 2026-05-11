import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AlunoService } from "@/services/aluno.service";

export default async function ExtratoAlunoPage() {
  const session = await getServerSession(authOptions);
  const conta = await AlunoService.consultarExtrato(session!.user.alunoId!);

  const todasTransacoes = [
    ...(conta?.transacoesRecebidas ?? []).map((t) => ({ ...t, direcao: "entrada" as const })),
    ...(conta?.transacoesEnviadas ?? []).map((t) => ({ ...t, direcao: "saida" as const })),
  ].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a5c2a]">Extrato</h1>
        <div className="rounded-lg bg-[#fef9e7] px-4 py-2 ring-1 ring-[#f0c040]/40">
          <span className="text-sm text-gray-600">Saldo: </span>
          <span className="font-bold text-[#c9a227]">{conta?.saldo ?? 0} moedas</span>
        </div>
      </div>

      {todasTransacoes.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhuma transação encontrada.</p>
      ) : (
        <div className="space-y-2">
          {todasTransacoes.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-lg border-2 border-[#2d8a4e]/15 bg-white p-4 shadow-sm hover:border-[#f0c040]/30 transition"
            >
              <div>
                <p className="font-medium text-[#1a5c2a]">
                  {t.tipo === "ENVIO" ? "Moedas recebidas" : `Resgate: ${t.vantagem?.descricao ?? ""}`}
                </p>
                {t.motivo && <p className="text-sm text-gray-500">{t.motivo}</p>}
                {t.codigoCupom && (
                  <p className="text-xs text-[#1a5c2a] font-mono font-semibold">Cupom: {t.codigoCupom}</p>
                )}
                <p className="text-xs text-gray-400">
                  {new Date(t.data).toLocaleString("pt-BR")}
                </p>
              </div>
              <span
                className={`text-lg font-bold ${
                  t.direcao === "entrada" ? "text-[#1a5c2a]" : "text-red-600"
                }`}
              >
                {t.direcao === "entrada" ? "+" : "-"}
                {t.valor}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
