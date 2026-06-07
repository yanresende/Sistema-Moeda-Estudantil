import { CadastroVantagemForm } from "./CadastroVantagemForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NovaVantagemPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Breadcrumb */}
      <Link
        href="/empresa/vantagens"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ChevronLeft size={16} />
        Voltar para vantagens
      </Link>

      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Nova Vantagem</h1>
        <p className="page-subtitle">Cadastre uma oferta que os alunos poderão resgatar com moedas.</p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm max-w-lg">
        <CadastroVantagemForm />
      </div>
    </div>
  );
}
