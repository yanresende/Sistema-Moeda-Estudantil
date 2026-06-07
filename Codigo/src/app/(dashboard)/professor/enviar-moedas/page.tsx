import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EnviarMoedasForm } from "./EnviarMoedasForm";
import { Send } from "lucide-react";

export default async function EnviarMoedasPage() {
  const session = await getServerSession(authOptions);

  const professor = await prisma.professor.findUnique({
    where: { id: session!.user.professorId! },
    select: { instituicaoId: true },
  });

  const alunos = await prisma.aluno.findMany({
    where: { instituicaoId: professor?.instituicaoId },
    select: { id: true, nome: true, curso: true },
    orderBy: { nome: "asc" },
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Enviar Moedas</h1>
        <p className="page-subtitle">
          Reconheça um aluno da sua instituição com uma mensagem de mérito.
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm max-w-lg">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Send size={20} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">Nova transferência</p>
            <p className="text-xs text-slate-500">
              {alunos.length} aluno{alunos.length !== 1 ? "s" : ""} disponível{alunos.length !== 1 ? "is" : ""}
            </p>
          </div>
        </div>
        <EnviarMoedasForm alunos={alunos} />
      </div>
    </div>
  );
}
