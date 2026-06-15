export const dynamic = 'force-dynamic';

import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { CadastroAlunoForm } from "./CadastroAlunoForm";
import { GraduationCap, Award, Coins } from "lucide-react";

export default async function CadastroPage() {
  const instituicoes = await prisma.instituicao.findMany({
    select: { id: true, nome: true },
    orderBy: { nome: "asc" },
  });

  return (
    <main className="flex min-h-screen">
      {/* Left — branding */}
      <div className="relative hidden lg:flex lg:w-5/12 flex-col justify-between bg-gradient-to-br from-[#061a0e] via-[#0d3d1e] to-[#061a0e] p-12 overflow-hidden">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-green-600/10 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-amber-400/5 translate-y-1/3 -translate-x-1/3" />

        <div className="coin-float absolute top-[20%] right-[12%] h-14 w-14 rounded-full border-4 border-amber-400/30 bg-gradient-to-br from-amber-400/15 to-amber-600/5">
          <div className="absolute inset-[6px] rounded-full border-2 border-amber-400/20" />
        </div>
        <div className="coin-float-delay-3 absolute bottom-[28%] right-[8%] h-9 w-9 rounded-full border-4 border-amber-400/25 bg-gradient-to-br from-amber-400/10 to-amber-600/5" />

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

        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-bold leading-tight text-white">
            Comece a ganhar<br />
            <span className="text-amber-400">moedas hoje.</span>
          </h2>
          <p className="text-sm text-green-200 leading-relaxed">
            Crie sua conta de aluno e passe a receber moedas pelos seus professores. Troque por vantagens exclusivas de empresas parceiras.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { icon: GraduationCap, text: "Receba reconhecimento acadêmico" },
              { icon: Coins, text: "Acumule moedas com seu desempenho" },
              { icon: Award, text: "Troque por vantagens reais" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-amber-400">
                  <Icon size={14} />
                </div>
                <p className="text-sm text-green-200">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-green-500">
          © 2025 Moeda Estudantil
        </p>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 py-12 sm:px-12 overflow-y-auto">
        <div className="w-full max-w-lg space-y-8">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
              <Image src="/logo_sistema_moedas2.png" alt="Logo" width={36} height={36} className="object-contain" />
            </div>
            <span className="text-base font-bold text-slate-900">Moeda Estudantil</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Criar conta de Aluno</h1>
            <p className="mt-1 text-sm text-slate-500">Preencha seus dados para começar.</p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
            <CadastroAlunoForm instituicoes={instituicoes} />
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
