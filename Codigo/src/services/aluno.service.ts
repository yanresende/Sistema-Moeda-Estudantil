import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

type CadastrarAlunoInput = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  rg: string;
  endereco: string;
  curso: string;
  instituicaoId: string;
};

export const AlunoService = {
  async cadastrar(data: CadastrarAlunoInput) {
    const senhaHash = await bcrypt.hash(data.senha, 12);

    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email: data.email, senha: senhaHash, role: "ALUNO" },
      });

      const aluno = await tx.aluno.create({
        data: {
          userId: user.id,
          nome: data.nome,
          cpf: data.cpf,
          rg: data.rg,
          endereco: data.endereco,
          curso: data.curso,
          instituicaoId: data.instituicaoId,
        },
      });

      await tx.conta.create({ data: { alunoId: aluno.id, saldo: 0 } });

      return { user, aluno };
    });
  },

  async consultarExtrato(alunoId: string) {
    return prisma.conta.findUnique({
      where: { alunoId },
      include: {
        transacoesRecebidas: {
          include: { contaOrigem: true },
          orderBy: { data: "desc" },
        },
        transacoesEnviadas: {
          include: { vantagem: true },
          orderBy: { data: "desc" },
        },
      },
    });
  },

  async trocarMoedas({
    alunoId,
    vantagemId,
  }: {
    alunoId: string;
    vantagemId: string;
  }) {
    return prisma.$transaction(async (tx) => {
      const vantagem = await tx.vantagem.findUniqueOrThrow({
        where: { id: vantagemId, ativa: true },
        include: { empresa: { include: { user: true, conta: true } } },
      });

      const contaAluno = await tx.conta.findUniqueOrThrow({
        where: { alunoId },
      });

      if (contaAluno.saldo < vantagem.custoMoedas) {
        throw new Error("Saldo insuficiente");
      }

      await tx.conta.update({
        where: { id: contaAluno.id },
        data: { saldo: { decrement: vantagem.custoMoedas } },
      });

      // Credita na conta da empresa (rastreabilidade)
      if (vantagem.empresa.conta) {
        await tx.conta.update({
          where: { id: vantagem.empresa.conta.id },
          data: { saldo: { increment: vantagem.custoMoedas } },
        });
      }

      const codigoCupom = crypto
        .randomUUID()
        .replace(/-/g, "")
        .slice(0, 8)
        .toUpperCase();

      const transacao = await tx.transacao.create({
        data: {
          contaOrigemId: contaAluno.id,
          contaDestinoId: vantagem.empresa.conta?.id,
          valor: vantagem.custoMoedas,
          tipo: "RESGATE",
          vantagemId,
          codigoCupom,
        },
      });

      return { transacao, codigoCupom, vantagem };
    });
  },
};
