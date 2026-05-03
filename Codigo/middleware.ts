import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    // Mapeamento rota → role obrigatório
    const rotasPorRole: Record<string, string> = {
      "/aluno": "ALUNO",
      "/professor": "PROFESSOR",
      "/empresa": "EMPRESA",
    };

    for (const [rota, roleNecessario] of Object.entries(rotasPorRole)) {
      if (pathname.startsWith(rota) && role !== roleNecessario) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  },
  {
    callbacks: {
      // Exige que o usuário esteja autenticado para acessar as rotas protegidas
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/aluno/:path*", "/professor/:path*", "/empresa/:path*"],
};
