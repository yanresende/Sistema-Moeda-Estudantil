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
        <h1 className="text-2xl font-bold text-gray-800">Minhas Vantagens</h1>
        <Link
          href="/empresa/vantagens/nova"
          className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 transition"
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
              className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-800">{v.descricao}</p>
                <p className="text-xs text-gray-400">
                  Criada em {new Date(v.criadaEm).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                  {v.custoMoedas} moedas
                </span>
                <span
                  className={`text-xs font-medium ${
                    v.ativa ? "text-green-600" : "text-gray-400"
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
