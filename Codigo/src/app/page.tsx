import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    const roleRedirect: Record<string, string> = {
      ALUNO: "/aluno",
      PROFESSOR: "/professor",
      EMPRESA: "/empresa",
    };
    redirect(roleRedirect[session.user.role] ?? "/login");
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0d2b1a]">
      {/* Fundo degradê */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2b1a] via-[#1a5c2a] to-[#0a1f12]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,192,64,0.07)_0%,transparent_60%)]" />

      {/* Moedas flutuantes */}
      <div className="coin-float absolute top-[8%] left-[6%] h-20 w-20 rounded-full border-4 border-[#f0c040]/30 bg-gradient-to-br from-[#f5d060]/15 to-[#c9a227]/5">
        <div className="absolute inset-[6px] rounded-full border-2 border-[#f0c040]/20" />
      </div>
      <div className="coin-float-delay-1 absolute top-[12%] right-[9%] h-12 w-12 rounded-full border-4 border-[#f0c040]/25 bg-gradient-to-br from-[#f5d060]/15 to-[#c9a227]/5">
        <div className="absolute inset-[6px] rounded-full border-2 border-[#f0c040]/15" />
      </div>
      <div className="coin-float-2 absolute bottom-[14%] left-[5%] h-24 w-24 rounded-full border-4 border-[#f0c040]/20 bg-gradient-to-br from-[#f5d060]/10 to-[#c9a227]/5">
        <div className="absolute inset-[7px] rounded-full border-2 border-[#f0c040]/15" />
      </div>
      <div className="coin-float-delay-2 absolute top-[45%] left-[12%] h-8 w-8 rounded-full border-4 border-[#f0c040]/35 bg-gradient-to-br from-[#f5d060]/20 to-[#c9a227]/10">
        <div className="absolute inset-[5px] rounded-full border border-[#f0c040]/20" />
      </div>
      <div className="coin-float-delay-3 absolute bottom-[10%] right-[8%] h-16 w-16 rounded-full border-4 border-[#f0c040]/25 bg-gradient-to-br from-[#f5d060]/15 to-[#c9a227]/5">
        <div className="absolute inset-[6px] rounded-full border-2 border-[#f0c040]/15" />
      </div>
      <div className="coin-float-delay-4 absolute top-[60%] right-[18%] h-7 w-7 rounded-full border-4 border-[#f0c040]/30 bg-gradient-to-br from-[#f5d060]/20 to-[#c9a227]/10" />
      <div className="coin-float-delay-5 absolute top-[25%] right-[30%] h-10 w-10 rounded-full border-4 border-[#f0c040]/20 bg-gradient-to-br from-[#f5d060]/10 to-[#c9a227]/5">
        <div className="absolute inset-[5px] rounded-full border border-[#f0c040]/15" />
      </div>
      <div className="coin-float absolute bottom-[28%] right-[5%] h-14 w-14 rounded-full border-4 border-[#f0c040]/20 bg-gradient-to-br from-[#f5d060]/10 to-[#c9a227]/5">
        <div className="absolute inset-[6px] rounded-full border-2 border-[#f0c040]/15" />
      </div>

      {/* Conteúdo central */}
      <div className="relative z-10 text-center space-y-8 px-6 max-w-lg">
        {/* Logo moeda */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#f5d060] to-[#c9a227] text-4xl font-bold text-[#0d2b1a] shadow-2xl ring-8 ring-[#f0c040]/20">
          M
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-[#f0c040] drop-shadow-lg">
            Moeda Estudantil
          </h1>
          <p className="text-lg text-green-200">
            Reconhecendo o mérito estudantil através de uma moeda virtual.
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/login"
            className="rounded-xl bg-gradient-to-r from-[#f0c040] to-[#c9a227] px-8 py-3 text-[#0d2b1a] font-bold hover:from-[#d4a017] hover:to-[#b8901f] transition shadow-lg text-base"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="rounded-xl border-2 border-[#f0c040]/50 px-8 py-3 text-[#f0c040] font-bold hover:bg-[#f0c040]/10 transition text-base"
          >
            Cadastrar-se
          </Link>
        </div>

        <p className="text-sm text-green-300">
          Empresa parceira?{" "}
          <Link href="/cadastro-empresa" className="font-medium text-[#f0c040] hover:underline">
            Cadastre sua empresa
          </Link>
        </p>
      </div>
    </main>
  );
}
