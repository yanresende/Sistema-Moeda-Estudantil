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
        <h1 className="text-2xl font-bold text-[#1a5c2a]">Painel da Empresa</h1>
        <Link
          href="/empresa/vantagens/nova"
          className="rounded-md bg-gradient-to-r from-[#f0c040] to-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0d2b1a] hover:from-[#d4a017] hover:to-[#b8901f] transition shadow-md"
        >
          + Nova vantagem
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border-2 border-[#2d8a4e]/20 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Vantagens cadastradas</p>
          <p className="mt-1 text-4xl font-bold text-[#c9a227]">{vantagens.length}</p>
        </div>
        <div className="rounded-xl border-2 border-[#2d8a4e]/20 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Vantagens ativas</p>
          <p className="mt-1 text-4xl font-bold text-[#1a5c2a]">
            {vantagens.filter((v) => v.ativa).length}
          </p>
        </div>
      </div>
    </div>
  );
}
