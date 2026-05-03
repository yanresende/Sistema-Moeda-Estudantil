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
      <h1 className="text-2xl font-bold text-gray-800">Meu Painel</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-blue-600 p-6 text-white shadow">
          <p className="text-sm opacity-80">Saldo atual</p>
          <p className="text-4xl font-bold mt-1">{conta?.saldo ?? 0}</p>
          <p className="text-sm opacity-80 mt-1">moedas</p>
        </div>
        <Link
          href="/aluno/extrato"
          className="rounded-xl border bg-white p-6 shadow hover:shadow-md transition"
        >
          <p className="font-semibold text-gray-700">Ver Extrato</p>
          <p className="text-sm text-gray-500 mt-1">Histórico de transações</p>
        </Link>
        <Link
          href="/aluno/vantagens"
          className="rounded-xl border bg-white p-6 shadow hover:shadow-md transition"
        >
          <p className="font-semibold text-gray-700">Trocar Moedas</p>
          <p className="text-sm text-gray-500 mt-1">Veja as vantagens disponíveis</p>
        </Link>
      </div>
    </div>
  );
}
