import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SidebarNav, type NavItem } from "@/components/shared/SidebarNav";

const navLinks: Record<string, NavItem[]> = {
  ALUNO: [
    { label: "Início", href: "/aluno", icon: "Home" },
    { label: "Extrato", href: "/aluno/extrato", icon: "History" },
    { label: "Vantagens", href: "/aluno/vantagens", icon: "Gift" },
  ],
  PROFESSOR: [
    { label: "Início", href: "/professor", icon: "Home" },
    { label: "Enviar Moedas", href: "/professor/enviar-moedas", icon: "Send" },
    { label: "Extrato", href: "/professor/extrato", icon: "History" },
  ],
  EMPRESA: [
    { label: "Início", href: "/empresa", icon: "Home" },
    { label: "Vantagens", href: "/empresa/vantagens", icon: "Store" },
    { label: "Nova Vantagem", href: "/empresa/vantagens/nova", icon: "PlusCircle" },
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
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
        {/* Logo */}
        <Link
          href={`/${session.user.role.toLowerCase()}`}
          className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-white shadow-sm">
            M
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-900">Moeda</p>
            <p className="text-xs text-slate-400">Estudantil</p>
          </div>
        </Link>

        <SidebarNav
          links={links}
          userEmail={session.user.email!}
          role={session.user.role}
        />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-xs font-bold text-white">
            M
          </div>
          <span className="text-sm font-bold text-slate-900">Moeda Estudantil</span>
        </div>
        <div className="flex items-center gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-6 md:p-10 pt-20 md:pt-10">
        {children}
      </main>
    </div>
  );
}
