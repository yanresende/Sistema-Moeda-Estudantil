import Link from "next/link";
import { CadastroEmpresaForm } from "./CadastroEmpresaForm";
import { Store, Users, TrendingUp } from "lucide-react";

export default function CadastroEmpresaPage() {
  return (
    <main className="flex min-h-screen">
      {/* Left — branding */}
      <div className="relative hidden lg:flex lg:w-5/12 flex-col justify-between bg-gradient-to-br from-[#1a0d06] via-[#3d2200] to-[#1a0d06] p-12 overflow-hidden">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-amber-500/10 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-green-400/5 translate-y-1/3 -translate-x-1/3" />

        <div className="coin-float absolute top-[22%] right-[14%] h-14 w-14 rounded-full border-4 border-amber-400/35 bg-gradient-to-br from-amber-400/15 to-amber-600/5">
          <div className="absolute inset-[6px] rounded-full border-2 border-amber-400/20" />
        </div>
        <div className="coin-float-delay-2 absolute bottom-[22%] right-[6%] h-9 w-9 rounded-full border-4 border-amber-400/25 bg-gradient-to-br from-amber-400/10 to-amber-600/5" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-base font-bold text-white shadow-lg">
              M
            </div>
            <div>
              <p className="text-base font-bold text-white">Moeda Estudantil</p>
              <p className="text-xs text-amber-400">Para empresas parceiras</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-bold leading-tight text-white">
            Conecte-se com<br />
            <span className="text-amber-400">estudantes qualificados.</span>
          </h2>
          <p className="text-sm text-amber-100/70 leading-relaxed">
            Ofereça vantagens exclusivas e fortaleça sua marca junto ao público universitário.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { icon: Store, text: "Crie ofertas de vantagens personalizadas" },
              { icon: Users, text: "Alcance milhares de estudantes motivados" },
              { icon: TrendingUp, text: "Aumente sua visibilidade no meio acadêmico" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-amber-400">
                  <Icon size={14} />
                </div>
                <p className="text-sm text-amber-100/80">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-amber-700">
          © 2025 Moeda Estudantil
        </p>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-white">
              M
            </div>
            <span className="text-base font-bold text-slate-900">Moeda Estudantil</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Cadastro de Empresa</h1>
            <p className="mt-1 text-sm text-slate-500">Crie sua conta para oferecer vantagens aos alunos.</p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
            <CadastroEmpresaForm />
          </div>

          <p className="text-center text-sm text-slate-500">
            Já tem conta?{" "}
            <Link href="/login" className="font-semibold text-green-700 hover:text-green-800 transition-colors">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
