import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Users, Gift, ArrowRight, Star } from "lucide-react";

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
    <main className="flex min-h-screen flex-col bg-[#060f09]">
      {/* Navbar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-white shadow-lg">
            M
          </div>
          <span className="text-sm font-bold text-white">Moeda Estudantil</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-green-300 hover:text-white transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-amber-600 hover:to-amber-700 transition-all"
          >
            Cadastrar-se
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#060f09] via-[#0d3d1e] to-[#060f09]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(240,192,64,0.07)_0%,transparent_70%)]" />

        {/* Floating coins */}
        <div className="coin-float absolute top-[10%] left-[7%] h-20 w-20 rounded-full border-4 border-amber-400/25 bg-gradient-to-br from-amber-400/10 to-amber-600/5">
          <div className="absolute inset-[6px] rounded-full border-2 border-amber-400/15" />
        </div>
        <div className="coin-float-delay-1 absolute top-[15%] right-[10%] h-12 w-12 rounded-full border-4 border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-amber-600/5">
          <div className="absolute inset-[5px] rounded-full border-2 border-amber-400/15" />
        </div>
        <div className="coin-float-2 absolute bottom-[15%] left-[6%] h-24 w-24 rounded-full border-4 border-amber-400/15 bg-gradient-to-br from-amber-400/8 to-amber-600/3">
          <div className="absolute inset-[7px] rounded-full border-2 border-amber-400/10" />
        </div>
        <div className="coin-float-delay-3 absolute bottom-[12%] right-[8%] h-16 w-16 rounded-full border-4 border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-amber-600/5">
          <div className="absolute inset-[6px] rounded-full border-2 border-amber-400/12" />
        </div>
        <div className="coin-float-delay-2 absolute top-[45%] left-[14%] h-8 w-8 rounded-full border-4 border-amber-400/30 bg-gradient-to-br from-amber-400/15 to-amber-600/8">
          <div className="absolute inset-[4px] rounded-full border border-amber-400/20" />
        </div>
        <div className="coin-float-delay-4 absolute top-[55%] right-[16%] h-7 w-7 rounded-full border-4 border-amber-400/25 bg-gradient-to-br from-amber-400/12 to-amber-600/5" />

        {/* Badge */}
        <div className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-400">
          <Star size={12} />
          Reconhecimento Acadêmico
        </div>

        {/* Headline */}
        <div className="relative z-10 max-w-3xl space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
            Moedas que<br />
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              transformam mérito
            </span>
            <br />em vantagens.
          </h1>
          <p className="mx-auto max-w-xl text-base text-green-200 sm:text-lg">
            Professores reconhecem alunos com moedas virtuais. Alunos trocam por benefícios reais de empresas parceiras.
          </p>
        </div>

        {/* CTAs */}
        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transition-all"
          >
            Criar conta gratuita <ArrowRight size={16} />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all"
          >
            Já tenho conta
          </Link>
        </div>

        <p className="relative z-10 mt-6 text-sm text-green-500">
          Empresa parceira?{" "}
          <Link href="/cadastro-empresa" className="font-semibold text-amber-400 hover:text-amber-300 transition-colors">
            Cadastre sua empresa →
          </Link>
        </p>
      </section>

      {/* Features */}
      <section className="relative border-t border-white/5 bg-[#0a1a0e] px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Uma plataforma para todos
            </h2>
            <p className="mt-3 text-sm text-green-400">
              Cada perfil tem sua própria experiência.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Alunos",
                color: "text-green-400",
                bg: "bg-green-400/10",
                border: "border-green-400/20",
                description: "Receba moedas dos seus professores como reconhecimento. Acumule e troque por vantagens exclusivas de empresas parceiras.",
                cta: "Criar conta",
                href: "/cadastro",
              },
              {
                icon: Users,
                title: "Professores",
                color: "text-amber-400",
                bg: "bg-amber-400/10",
                border: "border-amber-400/20",
                description: "Distribua moedas aos alunos que se destacam. Incentive a participação, dedicação e o bom desempenho acadêmico.",
                cta: "Saiba mais",
                href: "/login",
              },
              {
                icon: Gift,
                title: "Empresas",
                color: "text-emerald-400",
                bg: "bg-emerald-400/10",
                border: "border-emerald-400/20",
                description: "Ofereça descontos e vantagens em troca de moedas. Conecte-se com estudantes engajados e fortaleça sua marca.",
                cta: "Cadastrar empresa",
                href: "/cadastro-empresa",
              },
            ].map(({ icon: Icon, title, color, bg, border, description, cta, href }) => (
              <div
                key={title}
                className={`rounded-2xl border ${border} bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/8`}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-green-300/70">{description}</p>
                <Link
                  href={href}
                  className={`inline-flex items-center gap-1 text-sm font-semibold ${color} hover:gap-2 transition-all`}
                >
                  {cta} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#060f09] px-6 py-8 text-center">
        <p className="text-xs text-green-700">
          © 2025 Moeda Estudantil · Plataforma de reconhecimento acadêmico
        </p>
      </footer>
    </main>
  );
}
