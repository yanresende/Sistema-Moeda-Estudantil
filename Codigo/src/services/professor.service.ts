import { prisma } from "@/lib/prisma";

export const ProfessorService = {
  async enviarMoedas({
    professorId,
    alunoId,
    quantidade,
    motivo,
  }: {
    professorId: string;
    alunoId: string;
    quantidade: number;
    motivo: string;
  }) {
    return prisma.$transaction(async (tx) => {
      const contaProfessor = await tx.conta.findUniqueOrThrow({
        where: { professorId },
      });

      if (contaProfessor.saldo < quantidade) {
        throw new Error("Saldo insuficiente para realizar o envio");
      }

      const contaAluno = await tx.conta.findUniqueOrThrow({
        where: { alunoId },
      });

      await tx.conta.update({
        where: { id: contaProfessor.id },
        data: { saldo: { decrement: quantidade } },
      });

      await tx.conta.update({
        where: { id: contaAluno.id },
        data: { saldo: { increment: quantidade } },
      });

      return tx.transacao.create({
        data: {
          contaOrigemId: contaProfessor.id,
          contaDestinoId: contaAluno.id,
          valor: quantidade,
          tipo: "ENVIO",
          motivo,
        },
      });
    });
  },

  async consultarExtrato(professorId: string) {
    return prisma.conta.findUnique({
      where: { professorId },
      include: {
        transacoesEnviadas: {
          include: {
            contaDestino: { include: { aluno: true } },
          },
          orderBy: { data: "desc" },
        },
      },
    });
  },

  async listarAlunos(instituicaoId: string) {
    return prisma.aluno.findMany({
      where: { instituicaoId },
      select: { id: true, nome: true, curso: true, conta: { select: { saldo: true } } },
      orderBy: { nome: "asc" },
    });
  },
};
