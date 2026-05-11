import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ProfessorService } from "@/services/professor.service";

export default async function ExtratoProfessorPage() {
  const session = await getServerSession(authOptions);
  const conta = await ProfessorService.consultarExtrato(session!.user.professorId!);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a5c2a]">Extrato de Envios</h1>
        <div className="rounded-lg bg-[#fef9e7] px-4 py-2 ring-1 ring-[#f0c040]/40">
          <span className="text-sm text-gray-600">Saldo disponível: </span>
          <span className="font-bold text-[#c9a227]">{conta?.saldo ?? 0} moedas</span>
        </div>
      </div>

      {(conta?.transacoesEnviadas ?? []).length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhum envio realizado ainda.</p>
      ) : (
        <div className="space-y-2">
          {conta!.transacoesEnviadas.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-lg border-2 border-[#2d8a4e]/15 bg-white p-4 shadow-sm hover:border-[#f0c040]/30 transition"
            >
              <div>
                <p className="font-medium text-[#1a5c2a]">
                  Enviado para: {t.contaDestino?.aluno?.nome ?? "Aluno"}
                </p>
                <p className="text-sm text-gray-500">{t.motivo}</p>
                <p className="text-xs text-gray-400">
                  {new Date(t.data).toLocaleString("pt-BR")}
                </p>
              </div>
              <span className="text-lg font-bold text-red-500">-{t.valor}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
