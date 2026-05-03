import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: Role;
      alunoId: string | null;
      professorId: string | null;
      empresaId: string | null;
    };
  }

  interface User {
    role: Role;
    alunoId: string | null;
    professorId: string | null;
    empresaId: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    alunoId: string | null;
    professorId: string | null;
    empresaId: string | null;
  }
}
