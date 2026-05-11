import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AlunoDashboard() {
  const session = await getServerSession(authOptions);
  const conta = await prisma.conta.findUnique({
    where: { alunoId: session!.user.alunoId! },
    select: { saldo: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1a5c2a]">Meu Painel</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-[#f0c040] to-[#c9a227] p-6 text-[#0d2b1a] shadow-lg">
          <p className="text-sm font-medium opacity-70">Saldo atual</p>
          <p className="mt-1 text-4xl font-bold">{conta?.saldo ?? 0}</p>
          <p className="mt-1 text-sm font-medium opacity-70">moedas</p>
        </div>
        <Link
          href="/aluno/extrato"
          className="rounded-xl border-2 border-[#2d8a4e]/20 bg-white p-6 shadow hover:shadow-md hover:border-[#f0c040]/50 transition group"
        >
          <p className="font-semibold text-[#1a5c2a] group-hover:text-[#c9a227] transition">Ver Extrato</p>
          <p className="text-sm text-gray-500 mt-1">Histórico de transações</p>
        </Link>
        <Link
          href="/aluno/vantagens"
          className="rounded-xl border-2 border-[#2d8a4e]/20 bg-white p-6 shadow hover:shadow-md hover:border-[#f0c040]/50 transition group"
        >
          <p className="font-semibold text-[#1a5c2a] group-hover:text-[#c9a227] transition">Trocar Moedas</p>
          <p className="text-sm text-gray-500 mt-1">Veja as vantagens disponíveis</p>
        </Link>
      </div>
    </div>
  );
}
