import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "./LoginForm";
import { GraduationCap, Users, Gift } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      {/* Left — branding */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-[#061a0e] via-[#0d3d1e] to-[#061a0e] p-12 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-green-600/10 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-amber-400/5 translate-y-1/3 -translate-x-1/3" />

        {/* Floating coins */}
        <div className="coin-float absolute top-[18%] right-[15%] h-16 w-16 rounded-full border-4 border-amber-400/30 bg-gradient-to-br from-amber-400/15 to-amber-600/5">
          <div className="absolute inset-[6px] rounded-full border-2 border-amber-400/20" />
        </div>
        <div className="coin-float-delay-2 absolute bottom-[25%] right-[10%] h-10 w-10 rounded-full border-4 border-amber-400/25 bg-gradient-to-br from-amber-400/10 to-amber-600/5">
          <div className="absolute inset-[5px] rounded-full border border-amber-400/15" />
        </div>
        <div className="coin-float-delay-4 absolute top-[50%] left-[8%] h-8 w-8 rounded-full border-4 border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-amber-600/5" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl overflow-hidden shadow-lg">
              <Image src="/logo_sistema_moedas2.png" alt="Logo" width={44} height={44} className="object-contain" />
            </div>
            <div>
              <p className="text-base font-bold text-white">Moeda Estudantil</p>
              <p className="text-xs text-green-400">Plataforma de mérito acadêmico</p>
            </div>
          </div>
        </div>

        {/* Central copy */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight text-white">
              Reconheça o mérito.<br />
              <span className="text-amber-400">Construa o futuro.</span>
            </h2>
            <p className="text-base text-green-200 leading-relaxed max-w-sm">
              Professores recompensam alunos com moedas virtuais. Alunos trocam por vantagens reais de empresas parceiras.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: GraduationCap, label: "Para alunos", desc: "Ganhe moedas e troque por benefícios exclusivos" },
              { icon: Users, label: "Para professores", desc: "Reconheça o desempenho dos seus alunos" },
              { icon: Gift, label: "Para empresas", desc: "Ofereça vantagens e conecte-se com estudantes" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-amber-400">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-green-300">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="relative z-10 text-xs text-green-500">
          © 2025 Moeda Estudantil. Plataforma educacional.
        </p>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
              <Image src="/logo_sistema_moedas2.png" alt="Logo" width={36} height={36} className="object-contain" />
            </div>
            <span className="text-base font-bold text-slate-900">Moeda Estudantil</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Entrar na plataforma</h1>
            <p className="mt-1 text-sm text-slate-500">Acesse sua conta com email e senha.</p>
          </div>

          <LoginForm />

          <div className="space-y-3 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
            <p>
              Não tem conta?{" "}
              <Link href="/cadastro" className="font-semibold text-green-700 hover:text-green-800 transition-colors">
                Cadastre-se como aluno
              </Link>
            </p>
            <p>
              É empresa parceira?{" "}
              <Link href="/cadastro-empresa" className="font-semibold text-amber-600 hover:text-amber-700 transition-colors">
                Cadastre sua empresa
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
