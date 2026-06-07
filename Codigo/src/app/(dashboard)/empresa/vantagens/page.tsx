import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { EmpresaService } from "@/services/empresa.service";
import Link from "next/link";
import { PlusCircle, Package } from "lucide-react";

export default async function VantagensEmpresaPage() {
  const session = await getServerSession(authOptions);
  const vantagens = await EmpresaService.listarVantagens(session!.user.empresaId!);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between page-header">
        <div>
          <h1 className="page-title">Minhas Vantagens</h1>
          <p className="page-subtitle">Gerencie todas as suas ofertas cadastradas.</p>
        </div>
        <Link href="/empresa/vantagens/nova" className="btn-primary shrink-0">
          <PlusCircle size={16} />
          Nova vantagem
        </Link>
      </div>

      {vantagens.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
          <Package size={40} className="mb-3 text-slate-300" />
          <p className="font-semibold text-slate-600">Nenhuma vantagem cadastrada</p>
          <p className="mt-1 text-sm text-slate-400 mb-6">Crie sua primeira oferta para os alunos.</p>
          <Link href="/empresa/vantagens/nova" className="btn-primary">
            <PlusCircle size={16} />
            Criar vantagem
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Vantagem
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Custo
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Criada em
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vantagens.map((v) => (
                <tr key={v.id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900 text-sm">{v.descricao}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="badge-amber">{v.custoMoedas} moedas</span>
                  </td>
                  <td className="px-5 py-4">
                    {v.ativa ? (
                      <span className="badge-green">Ativa</span>
                    ) : (
                      <span className="badge-slate">Inativa</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {new Date(v.criadaEm).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
