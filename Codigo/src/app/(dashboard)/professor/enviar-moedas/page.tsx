import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EnviarMoedasForm } from "./EnviarMoedasForm";

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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1a5c2a]">Enviar Moedas</h1>
      <p className="text-gray-500 text-sm">
        Reconheça um aluno da sua instituição enviando moedas com uma mensagem de motivo.
      </p>
      <EnviarMoedasForm alunos={alunos} />
    </div>
  );
}
