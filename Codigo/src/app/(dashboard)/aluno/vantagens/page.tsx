import { EmpresaService } from "@/services/empresa.service";
import { ResgateButton } from "./ResgateButton";

export default async function VantagensAlunoPage() {
  const vantagens = await EmpresaService.listarTodasVantagens();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1a5c2a]">Vantagens disponíveis</h1>

      {vantagens.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          Nenhuma vantagem disponível no momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vantagens.map((v) => (
            <div key={v.id} className="rounded-xl border-2 border-[#2d8a4e]/15 bg-white shadow-sm overflow-hidden hover:border-[#f0c040]/40 hover:shadow-md transition">
              {v.foto && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={v.foto} alt={v.descricao} className="w-full h-40 object-cover" />
              )}
              <div className="p-4 space-y-3">
                <p className="font-semibold text-[#1a5c2a]">{v.descricao}</p>
                <p className="text-sm text-gray-500">{v.empresa.nome}</p>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#fef9e7] px-3 py-1 text-sm font-bold text-[#c9a227] ring-1 ring-[#f0c040]/30">
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
