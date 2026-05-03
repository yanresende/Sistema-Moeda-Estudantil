import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Instituição
  const inst = await prisma.instituicao.upsert({
    where: { nome: "Universidade Federal de Exemplo" },
    update: {},
    create: { nome: "Universidade Federal de Exemplo" },
  });

  // Professor de exemplo
  const senhaHash = await bcrypt.hash("senha123", 12);

  const profUser = await prisma.user.upsert({
    where: { email: "professor@exemplo.com" },
    update: {},
    create: {
      email: "professor@exemplo.com",
      senha: senhaHash,
      role: "PROFESSOR",
      professor: {
        create: {
          nome: "Carlos Souza",
          cpf: "11122233344",
          departamento: "Ciência da Computação",
          instituicaoId: inst.id,
        },
      },
    },
    include: { professor: true },
  });

  // Conta do professor com saldo inicial (alocação semestral)
  if (profUser.professor) {
    await prisma.conta.upsert({
      where: { professorId: profUser.professor.id },
      update: {},
      create: { professorId: profUser.professor.id, saldo: 1000 },
    });
  }

  // Empresa parceira de exemplo
  const empUser = await prisma.user.upsert({
    where: { email: "empresa@exemplo.com" },
    update: {},
    create: {
      email: "empresa@exemplo.com",
      senha: senhaHash,
      role: "EMPRESA",
      empresa: {
        create: { nome: "Livraria Acadêmica" },
      },
    },
    include: { empresa: true },
  });

  if (empUser.empresa) {
    await prisma.conta.upsert({
      where: { empresaId: empUser.empresa.id },
      update: {},
      create: { empresaId: empUser.empresa.id, saldo: 0 },
    });

    await prisma.vantagem.create({
      data: {
        empresaId: empUser.empresa.id,
        descricao: "20% de desconto em qualquer livro",
        custoMoedas: 100,
      },
    });
  }

  console.log("Seed concluído!");
  console.log("Professor: professor@exemplo.com / senha123");
  console.log("Empresa:   empresa@exemplo.com   / senha123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
