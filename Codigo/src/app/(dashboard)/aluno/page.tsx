import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Wallet, History, Gift, ArrowRight, TrendingUp } from "lucide-react";

export default async function AlunoDashboard() {
  const session = await getServerSession(authOptions);
  const conta = await prisma.conta.findUnique({
    where: { alunoId: session!.user.alunoId! },
    select: { saldo: true },
  });

  const saldo = conta?.saldo ?? 0;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Meu Painel</h1>
        <p className="page-subtitle">Acompanhe seu saldo e acesse suas vantagens.</p>
      </div>

      {/* Hero — saldo */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-800 via-green-700 to-emerald-700 p-8 text-white shadow-lg">
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5" />
        <div className="relative z-10">
          <div className="mb-3 flex items-center gap-2 text-green-200">
            <Wallet size={16} />
            <span className="text-sm font-medium">Saldo disponível</span>
          </div>
          <p className="text-6xl font-bold tracking-tight">{saldo}</p>
          <p className="mt-2 text-green-200 text-sm">moedas virtuais</p>
        </div>
        <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-green-100">
          <TrendingUp size={12} />
          Moeda Estudantil
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Acesso rápido
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/aluno/extrato"
            className="stat-card group cursor-pointer transition-all hover:border-green-200 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-green-50 group-hover:text-green-600">
                <History size={22} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Extrato</p>
                <p className="text-sm text-slate-500">Histórico de transações</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-1 text-sm font-medium text-green-600 transition-all group-hover:gap-2">
              Ver extrato <ArrowRight size={14} />
            </div>
          </Link>

          <Link
            href="/aluno/vantagens"
            className="stat-card group cursor-pointer transition-all hover:border-amber-200 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-amber-50 group-hover:text-amber-600">
                <Gift size={22} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Vantagens</p>
                <p className="text-sm text-slate-500">Troque moedas por benefícios</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-1 text-sm font-medium text-amber-600 transition-all group-hover:gap-2">
              Ver vantagens <ArrowRight size={14} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
