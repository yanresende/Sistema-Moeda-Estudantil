import { CadastroVantagemForm } from "./CadastroVantagemForm";

export default function NovaVantagemPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Nova Vantagem</h1>
      <p className="text-gray-500 text-sm">
        Cadastre uma vantagem que os alunos poderão resgatar com suas moedas.
      </p>
      <CadastroVantagemForm />
    </div>
  );
}
