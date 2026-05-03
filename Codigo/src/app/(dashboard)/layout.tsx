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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-lg font-bold text-blue-700">Moeda Estudantil</span>
            <nav className="flex gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-gray-600 hover:text-blue-600 transition"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{session.user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
