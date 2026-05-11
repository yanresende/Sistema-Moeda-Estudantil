import Link from "next/link";
import { CadastroEmpresaForm } from "./CadastroEmpresaForm";

export default function CadastroEmpresaPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-700">Cadastro de Empresa Parceira</h1>
          <p className="mt-1 text-sm text-gray-500">
            Crie sua conta para oferecer vantagens aos alunos
          </p>
        </div>
        <CadastroEmpresaForm />
        <p className="text-center text-sm text-gray-500">
          Já tem conta?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
