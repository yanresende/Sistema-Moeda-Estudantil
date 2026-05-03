import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CadastroAlunoForm } from "./CadastroAlunoForm";

export default async function CadastroPage() {
  const instituicoes = await prisma.instituicao.findMany({
    select: { id: true, nome: true },
    orderBy: { nome: "asc" },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-lg space-y-6 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-700">Criar conta de Aluno</h1>
          <p className="mt-1 text-sm text-gray-500">
            Preencha os dados abaixo para se cadastrar
          </p>
        </div>
        <CadastroAlunoForm instituicoes={instituicoes} />
        <p className="text-center text-sm text-gray-500">
          Já tem conta?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
