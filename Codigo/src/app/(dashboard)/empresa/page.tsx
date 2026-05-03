import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { EmpresaService } from "@/services/empresa.service";
import Link from "next/link";

export default async function EmpresaDashboard() {
  const session = await getServerSession(authOptions);
  const vantagens = await EmpresaService.listarVantagens(session!.user.empresaId!);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Painel da Empresa</h1>
        <Link
          href="/empresa/vantagens/nova"
          className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 transition"
        >
          + Nova vantagem
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Vantagens cadastradas</p>
          <p className="text-4xl font-bold text-green-600 mt-1">{vantagens.length}</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Vantagens ativas</p>
          <p className="text-4xl font-bold text-green-600 mt-1">
            {vantagens.filter((v) => v.ativa).length}
          </p>
        </div>
      </div>
    </div>
  );
}
