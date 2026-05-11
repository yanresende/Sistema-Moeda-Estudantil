import Link from "next/link";
import { CadastroEmpresaForm } from "./CadastroEmpresaForm";

export default function CadastroEmpresaPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d2b1a] py-12">
      {/* Fundo degradê */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2b1a] via-[#1a5c2a] to-[#0a1f12]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,192,64,0.06)_0%,transparent_65%)]" />

      {/* Moedas flutuantes */}
      <div className="coin-float absolute top-[10%] left-[7%] h-16 w-16 rounded-full border-4 border-[#f0c040]/30 bg-gradient-to-br from-[#f5d060]/15 to-[#c9a227]/5">
        <div className="absolute inset-[6px] rounded-full border-2 border-[#f0c040]/20" />
      </div>
      <div className="coin-float-delay-2 absolute top-[8%] right-[10%] h-10 w-10 rounded-full border-4 border-[#f0c040]/25 bg-gradient-to-br from-[#f5d060]/15 to-[#c9a227]/5">
        <div className="absolute inset-[5px] rounded-full border-2 border-[#f0c040]/15" />
      </div>
      <div className="coin-float-2 absolute bottom-[12%] left-[5%] h-20 w-20 rounded-full border-4 border-[#f0c040]/20 bg-gradient-to-br from-[#f5d060]/10 to-[#c9a227]/5">
        <div className="absolute inset-[7px] rounded-full border-2 border-[#f0c040]/15" />
      </div>
      <div className="coin-float-delay-3 absolute bottom-[10%] right-[8%] h-12 w-12 rounded-full border-4 border-[#f0c040]/25 bg-gradient-to-br from-[#f5d060]/15 to-[#c9a227]/5">
        <div className="absolute inset-[6px] rounded-full border-2 border-[#f0c040]/15" />
      </div>
      <div className="coin-float-delay-5 absolute top-[45%] right-[5%] h-7 w-7 rounded-full border-4 border-[#f0c040]/30 bg-gradient-to-br from-[#f5d060]/20 to-[#c9a227]/10" />

      {/* Card de cadastro */}
      <div className="relative z-10 w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-[#f0c040]/30">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#f5d060] to-[#c9a227] text-xl font-bold text-[#0d2b1a] shadow-lg ring-4 ring-[#f0c040]/20">
            E
          </div>
          <h1 className="text-2xl font-bold text-[#1a5c2a]">Cadastro de Empresa Parceira</h1>
          <p className="mt-1 text-sm text-gray-500">
            Crie sua conta para oferecer vantagens aos alunos
          </p>
        </div>
        <CadastroEmpresaForm />
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
