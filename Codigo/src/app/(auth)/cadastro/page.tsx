import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CadastroAlunoForm } from "./CadastroAlunoForm";

export default async function CadastroPage() {
  const instituicoes = await prisma.instituicao.findMany({
    select: { id: true, nome: true },
    orderBy: { nome: "asc" },
  });

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d2b1a] py-12">
      {/* Fundo degradê */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2b1a] via-[#1a5c2a] to-[#0a1f12]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,192,64,0.06)_0%,transparent_65%)]" />

      {/* Moedas flutuantes */}
      <div className="coin-float absolute top-[5%] left-[8%] h-16 w-16 rounded-full border-4 border-[#f0c040]/30 bg-gradient-to-br from-[#f5d060]/15 to-[#c9a227]/5">
        <div className="absolute inset-[6px] rounded-full border-2 border-[#f0c040]/20" />
      </div>
      <div className="coin-float-delay-1 absolute top-[10%] right-[12%] h-12 w-12 rounded-full border-4 border-[#f0c040]/25 bg-gradient-to-br from-[#f5d060]/15 to-[#c9a227]/5">
        <div className="absolute inset-[6px] rounded-full border-2 border-[#f0c040]/15" />
      </div>
      <div className="coin-float-2 absolute bottom-[10%] left-[5%] h-20 w-20 rounded-full border-4 border-[#f0c040]/20 bg-gradient-to-br from-[#f5d060]/10 to-[#c9a227]/5">
        <div className="absolute inset-[7px] rounded-full border-2 border-[#f0c040]/15" />
      </div>
      <div className="coin-float-delay-3 absolute bottom-[8%] right-[6%] h-14 w-14 rounded-full border-4 border-[#f0c040]/25 bg-gradient-to-br from-[#f5d060]/15 to-[#c9a227]/5">
        <div className="absolute inset-[6px] rounded-full border-2 border-[#f0c040]/15" />
      </div>
      <div className="coin-float-delay-4 absolute top-[50%] right-[4%] h-8 w-8 rounded-full border-4 border-[#f0c040]/30 bg-gradient-to-br from-[#f5d060]/20 to-[#c9a227]/10" />
      <div className="coin-float-delay-5 absolute top-[35%] left-[3%] h-10 w-10 rounded-full border-4 border-[#f0c040]/20 bg-gradient-to-br from-[#f5d060]/10 to-[#c9a227]/5">
        <div className="absolute inset-[5px] rounded-full border border-[#f0c040]/15" />
      </div>

      {/* Card de cadastro */}
      <div className="relative z-10 w-full max-w-lg space-y-6 rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-[#f0c040]/30">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#f5d060] to-[#c9a227] text-xl font-bold text-[#0d2b1a] shadow-lg ring-4 ring-[#f0c040]/20">
            M
          </div>
          <h1 className="text-2xl font-bold text-[#1a5c2a]">Criar conta de Aluno</h1>
          <p className="mt-1 text-sm text-gray-500">
            Preencha os dados abaixo para se cadastrar
          </p>
        </div>
        <CadastroAlunoForm instituicoes={instituicoes} />
        <p className="text-center text-sm text-gray-500">
          Já tem conta?{" "}
          <Link href="/login" className="font-medium text-[#1a5c2a] hover:text-[#c9a227] transition">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
