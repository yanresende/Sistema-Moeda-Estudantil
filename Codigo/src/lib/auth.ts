import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { aluno: true, professor: true, empresa: true },
        });

        if (!user) return null;

        const senhaValida = await bcrypt.compare(
          credentials.password,
          user.senha
        );
        if (!senhaValida) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          alunoId: user.aluno?.id ?? null,
          professorId: user.professor?.id ?? null,
          empresaId: user.empresa?.id ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.alunoId = user.alunoId;
        token.professorId = user.professorId;
        token.empresaId = user.empresaId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      session.user.alunoId = token.alunoId as string | null;
      session.user.professorId = token.professorId as string | null;
      session.user.empresaId = token.empresaId as string | null;
      return session;
    },
  },
};
