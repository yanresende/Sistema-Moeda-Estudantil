import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProfessorDashboard() {
  const session = await getServerSession(authOptions);
  const conta = await prisma.conta.findUnique({
    where: { professorId: session!.user.professorId! },
    select: { saldo: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1a5c2a]">Painel do Professor</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-[#f0c040] to-[#c9a227] p-6 text-[#0d2b1a] shadow-lg">
          <p className="text-sm font-medium opacity-70">Moedas disponíveis</p>
          <p className="mt-1 text-4xl font-bold">{conta?.saldo ?? 0}</p>
          <p className="mt-1 text-sm font-medium opacity-70">para distribuir</p>
        </div>
        <Link
          href="/professor/enviar-moedas"
          className="rounded-xl border-2 border-[#2d8a4e]/20 bg-white p-6 shadow hover:shadow-md hover:border-[#f0c040]/50 transition group"
        >
          <p className="font-semibold text-[#1a5c2a] group-hover:text-[#c9a227] transition">Enviar Moedas</p>
          <p className="text-sm text-gray-500 mt-1">Reconheça um aluno</p>
        </Link>
        <Link
          href="/professor/extrato"
          className="rounded-xl border-2 border-[#2d8a4e]/20 bg-white p-6 shadow hover:shadow-md hover:border-[#f0c040]/50 transition group"
        >
          <p className="font-semibold text-[#1a5c2a] group-hover:text-[#c9a227] transition">Extrato</p>
          <p className="text-sm text-gray-500 mt-1">Histórico de envios</p>
        </Link>
      </div>
    </div>
  );
}
