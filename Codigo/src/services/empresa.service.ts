import { prisma } from "@/lib/prisma";

export const EmpresaService = {
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
