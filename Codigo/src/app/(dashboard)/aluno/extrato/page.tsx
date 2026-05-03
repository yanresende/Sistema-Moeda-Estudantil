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
        <h1 className="text-2xl font-bold text-gray-800">Extrato</h1>
        <div className="rounded-lg bg-blue-50 px-4 py-2">
          <span className="text-sm text-gray-600">Saldo: </span>
          <span className="font-bold text-blue-700">{conta?.saldo ?? 0} moedas</span>
        </div>
      </div>

      {todasTransacoes.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhuma transação encontrada.</p>
      ) : (
        <div className="space-y-2">
          {todasTransacoes.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {t.tipo === "ENVIO" ? "Moedas recebidas" : `Resgate: ${t.vantagem?.descricao ?? ""}`}
                </p>
                {t.motivo && <p className="text-sm text-gray-500">{t.motivo}</p>}
                {t.codigoCupom && (
                  <p className="text-xs text-blue-600 font-mono">Cupom: {t.codigoCupom}</p>
                )}
                <p className="text-xs text-gray-400">
                  {new Date(t.data).toLocaleString("pt-BR")}
                </p>
              </div>
              <span
                className={`text-lg font-bold ${
                  t.direcao === "entrada" ? "text-green-600" : "text-red-600"
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
