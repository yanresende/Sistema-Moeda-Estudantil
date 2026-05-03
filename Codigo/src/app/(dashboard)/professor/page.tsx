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
      <h1 className="text-2xl font-bold text-gray-800">Painel do Professor</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-indigo-600 p-6 text-white shadow">
          <p className="text-sm opacity-80">Moedas disponíveis</p>
          <p className="text-4xl font-bold mt-1">{conta?.saldo ?? 0}</p>
          <p className="text-sm opacity-80 mt-1">para distribuir</p>
        </div>
        <Link
          href="/professor/enviar-moedas"
          className="rounded-xl border bg-white p-6 shadow hover:shadow-md transition"
        >
          <p className="font-semibold text-gray-700">Enviar Moedas</p>
          <p className="text-sm text-gray-500 mt-1">Reconheça um aluno</p>
        </Link>
        <Link
          href="/professor/extrato"
          className="rounded-xl border bg-white p-6 shadow hover:shadow-md transition"
        >
          <p className="font-semibold text-gray-700">Extrato</p>
          <p className="text-sm text-gray-500 mt-1">Histórico de envios</p>
        </Link>
      </div>
    </div>
  );
}
