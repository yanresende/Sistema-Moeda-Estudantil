import { EmpresaService } from "@/services/empresa.service";
import { ResgateButton } from "./ResgateButton";
import { Gift, Store } from "lucide-react";

export default async function VantagensAlunoPage() {
  const vantagens = await EmpresaService.listarTodasVantagens();

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Vantagens disponíveis</h1>
        <p className="page-subtitle">Use suas moedas para resgatar benefícios exclusivos.</p>
      </div>

      {vantagens.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
          <Gift size={40} className="mb-3 text-slate-300" />
          <p className="font-semibold text-slate-600">Nenhuma vantagem disponível</p>
          <p className="mt-1 text-sm text-slate-400">Em breve empresas parceiras adicionarão ofertas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vantagens.map((v) => (
            <div
              key={v.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              {/* Image */}
              {v.foto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={v.foto}
                  alt={v.descricao}
                  className="h-44 w-full object-cover transition-transform group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
                  <Gift size={36} />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 leading-tight">{v.descricao}</p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <Store size={12} />
                      {v.empresa.nome}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="badge-amber">
                    {v.custoMoedas} moedas
                  </span>
                  <ResgateButton vantagemId={v.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
