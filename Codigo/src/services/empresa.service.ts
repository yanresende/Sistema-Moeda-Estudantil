import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

type CadastrarEmpresaInput = {
  nome: string;
  email: string;
  senha: string;
};

export const EmpresaService = {
  async cadastrar(data: CadastrarEmpresaInput) {
    const senhaHash = await bcrypt.hash(data.senha, 12);

    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email: data.email, senha: senhaHash, role: "EMPRESA" },
      });

      const empresa = await tx.empresaParceira.create({
        data: { userId: user.id, nome: data.nome },
      });

      await tx.conta.create({ data: { empresaId: empresa.id, saldo: 0 } });

      return { user, empresa };
    });
  },

  async cadastrarVantagem({
    empresaId,
    descricao,
    foto,
    custoMoedas,
  }: {
    empresaId: string;
    descricao: string;
    foto?: string;
    custoMoedas: number;
  }) {
    return prisma.vantagem.create({
      data: { empresaId, descricao, foto, custoMoedas },
    });
  },

  async listarVantagens(empresaId: string) {
    return prisma.vantagem.findMany({
      where: { empresaId },
      orderBy: { criadaEm: "desc" },
    });
  },

  async listarTodasVantagens() {
    return prisma.vantagem.findMany({
      where: { ativa: true },
      include: { empresa: { select: { nome: true } } },
      orderBy: { criadaEm: "desc" },
    });
  },
};