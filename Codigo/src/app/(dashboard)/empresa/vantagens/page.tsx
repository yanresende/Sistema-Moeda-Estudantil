import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { EmpresaService } from "@/services/empresa.service";
import Link from "next/link";

export default async function VantagensEmpresaPage() {
  const session = await getServerSession(authOptions);
  const vantagens = await EmpresaService.listarVantagens(session!.user.empresaId!);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a5c2a]">Minhas Vantagens</h1>
        <Link
          href="/empresa/vantagens/nova"
          className="rounded-md bg-gradient-to-r from-[#f0c040] to-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0d2b1a] hover:from-[#d4a017] hover:to-[#b8901f] transition shadow-md"
        >
          + Nova vantagem
        </Link>
      </div>

      {vantagens.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          Nenhuma vantagem cadastrada. Crie a primeira!
        </p>
      ) : (
        <div className="space-y-2">
          {vantagens.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between rounded-lg border-2 border-[#2d8a4e]/15 bg-white p-4 shadow-sm hover:border-[#f0c040]/30 transition"
            >
              <div>
                <p className="font-medium text-[#1a5c2a]">{v.descricao}</p>
                <p className="text-xs text-gray-400">
                  Criada em {new Date(v.criadaEm).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#fef9e7] px-3 py-1 text-sm font-bold text-[#c9a227] ring-1 ring-[#f0c040]/30">
                  {v.custoMoedas} moedas
                </span>
                <span
                  className={`text-xs font-medium ${
                    v.ativa ? "text-[#1a5c2a]" : "text-gray-400"
                  }`}
                >
                  {v.ativa ? "Ativa" : "Inativa"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
