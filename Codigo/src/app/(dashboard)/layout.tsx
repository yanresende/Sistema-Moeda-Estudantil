import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/shared/SignOutButton";

const navLinks: Record<string, { label: string; href: string }[]> = {
  ALUNO: [
    { label: "Início", href: "/aluno" },
    { label: "Extrato", href: "/aluno/extrato" },
    { label: "Vantagens", href: "/aluno/vantagens" },
  ],
  PROFESSOR: [
    { label: "Início", href: "/professor" },
    { label: "Enviar Moedas", href: "/professor/enviar-moedas" },
    { label: "Extrato", href: "/professor/extrato" },
  ],
  EMPRESA: [
    { label: "Início", href: "/empresa" },
    { label: "Vantagens", href: "/empresa/vantagens" },
    { label: "Nova Vantagem", href: "/empresa/vantagens/nova" },
  ],
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const links = navLinks[session.user.role] ?? [];

  return (
    <div className="min-h-screen bg-[#f0faf2]">
      <header className="bg-[#1a5c2a] border-b border-[#0d3d1a] shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#f5d060] to-[#c9a227] text-sm font-bold text-[#0d2b1a] shadow-sm">
                M
              </div>
              <span className="text-lg font-bold text-[#f0c040]">Moeda Estudantil</span>
            </div>
            <nav className="flex gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-green-200 hover:text-[#f0c040] transition font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-green-300">{session.user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
