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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-blue-700">Moeda Estudantil</h1>
        <p className="text-lg text-gray-600 max-w-md">
          Reconhecendo o mérito estudantil através de uma moeda virtual.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="rounded-lg border border-blue-600 px-6 py-3 text-blue-600 font-medium hover:bg-blue-50 transition"
          >
            Cadastrar-se
          </Link>
        </div>
      </div>
    </main>
  );
}
