import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Coins, Send, History, ArrowRight, Sparkles } from "lucide-react";

export default async function ProfessorDashboard() {
  const session = await getServerSession(authOptions);
  const conta = await prisma.conta.findUnique({
    where: { professorId: session!.user.professorId! },
    select: { saldo: true },
  });

  const saldo = conta?.saldo ?? 0;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Painel do Professor</h1>
        <p className="page-subtitle">Distribua moedas e reconheça o mérito dos seus alunos.</p>
      </div>

      {/* Hero — saldo disponível */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-800 via-green-700 to-emerald-700 p-8 text-white shadow-lg">
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5" />
        <div className="relative z-10">
          <div className="mb-3 flex items-center gap-2 text-green-200">
            <Coins size={16} />
            <span className="text-sm font-medium">Moedas para distribuir</span>
          </div>
          <p className="text-6xl font-bold tracking-tight">{saldo}</p>
          <p className="mt-2 text-green-200 text-sm">moedas disponíveis este semestre</p>
        </div>
        <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-green-100">
          <Sparkles size={12} />
          Reconheça o mérito
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Ações rápidas
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/professor/enviar-moedas"
            className="stat-card group cursor-pointer transition-all hover:border-amber-200 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
                <Send size={22} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Enviar Moedas</p>
                <p className="text-sm text-slate-500">Reconheça um aluno da sua turma</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-1 text-sm font-medium text-amber-600 transition-all group-hover:gap-2">
              Enviar agora <ArrowRight size={14} />
            </div>
          </Link>

          <Link
            href="/professor/extrato"
            className="stat-card group cursor-pointer transition-all hover:border-green-200 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-green-50 group-hover:text-green-600">
                <History size={22} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Extrato</p>
                <p className="text-sm text-slate-500">Histórico de envios realizados</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-1 text-sm font-medium text-green-600 transition-all group-hover:gap-2">
              Ver extrato <ArrowRight size={14} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
