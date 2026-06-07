"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Home,
  History,
  Gift,
  Send,
  Store,
  PlusCircle,
  LogOut,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Home,
  History,
  Gift,
  Send,
  Store,
  PlusCircle,
};

const roleLabel: Record<string, string> = {
  ALUNO: "Aluno",
  PROFESSOR: "Professor",
  EMPRESA: "Empresa Parceira",
};

export type NavItem = { label: string; href: string; icon: string };

interface Props {
  links: NavItem[];
  userEmail: string;
  role: string;
}

export function SidebarNav({ links, userEmail, role }: Props) {
  const pathname = usePathname();

  const exactRoots = ["/aluno", "/professor", "/empresa"];

  function isActive(href: string) {
    if (exactRoots.includes(href)) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="flex flex-1 flex-col justify-between overflow-y-auto py-4">
      <nav className="space-y-1 px-3">
        {links.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "sidebar-link-active" : "sidebar-link"}
            >
              {Icon && <Icon size={18} />}
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 px-3 pt-4 space-y-2">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">
            {userEmail[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-800">{userEmail}</p>
            <p className="text-xs text-slate-400">{roleLabel[role] ?? role}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={16} />
          Sair da conta
        </button>
      </div>
    </div>
  );
}
