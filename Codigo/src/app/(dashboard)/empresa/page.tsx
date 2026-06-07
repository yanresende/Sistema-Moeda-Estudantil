import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { EmpresaService } from "@/services/empresa.service";
import Link from "next/link";
import { Package, CheckCircle2, PlusCircle, ArrowRight, Store } from "lucide-react";

export default async function EmpresaDashboard() {
  const session = await getServerSession(authOptions);
  const vantagens = await EmpresaService.listarVantagens(session!.user.empresaId!);

  const total = vantagens.length;
  const ativas = vantagens.filter((v) => v.ativa).length;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between page-header">
        <div>
          <h1 className="page-title">Painel da Empresa</h1>
          <p className="page-subtitle">Gerencie suas vantagens e atraia mais alunos.</p>
        </div>
        <Link href="/empresa/vantagens/nova" className="btn-primary shrink-0">
          <PlusCircle size={16} />
          Nova vantagem
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Vantagens cadastradas</p>
              <p className="mt-2 text-4xl font-bold text-slate-900">{total}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
              <Package size={26} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm text-slate-500">
            Total de ofertas criadas
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Vantagens ativas</p>
              <p className="mt-2 text-4xl font-bold text-green-700">{ativas}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <CheckCircle2 size={26} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm text-slate-500">
            Visíveis para os alunos agora
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="stat-card flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Store size={22} />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Gerenciar vantagens</p>
            <p className="text-sm text-slate-500">Veja e edite todas as suas ofertas cadastradas</p>
          </div>
        </div>
        <Link
          href="/empresa/vantagens"
          className="btn-ghost shrink-0"
        >
          Ver todas <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
