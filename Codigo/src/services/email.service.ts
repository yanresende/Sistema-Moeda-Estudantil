import type { EmailMoedasPayload, EmailResgatePayload } from "./queue.service";

/**
 * EmailService — responsável por enviar emails transacionais.
 *
 * Na arquitetura com RabbitMQ, este service é chamado APENAS pelo worker
 * (worker/email.worker.ts), nunca diretamente pelas Server Actions.
 *
 * Troque a implementação interna por Nodemailer, Resend, SendGrid, etc.
 * sem precisar alterar as actions ou o worker.
 */
export class EmailService {
  // ─── US03: Notificação de recebimento de moedas ─────────────

  static async notificarAlunoRecebeuMoedas(
    payload: EmailMoedasPayload
  ): Promise<void> {
    const { emailAluno, nomeAluno, nomeProfessor, quantidade, motivo } = payload;

    // TODO: substitua o console.log pelo seu provedor de email preferido
    // Exemplo com Nodemailer:
    //   await transporter.sendMail({ to: emailAluno, subject: ..., html: ... })
    //
    // Exemplo com Resend:
    //   await resend.emails.send({ to: emailAluno, subject: ..., html: ... })

    console.log("─── [EmailService] Enviando email: Moedas Recebidas ───");
    console.log(`Para:      ${emailAluno}`);
    console.log(`Assunto:   Você recebeu ${quantidade} moeda(s) de ${nomeProfessor}!`);
    console.log(`Corpo:     Olá, ${nomeAluno}! O professor ${nomeProfessor} reconheceu seu mérito:`);
    console.log(`           "${motivo}"`);
    console.log(`           Seu saldo foi atualizado com +${quantidade} moeda(s).`);
    console.log("──────────────────────────────────────────────────────────");
  }

  // ─── US06: Cupom para o aluno após resgate ──────────────────

  static async enviarCupomAluno(
    payload: Pick<
      EmailResgatePayload,
      "emailAluno" | "nomeAluno" | "nomeVantagem" | "codigoCupom"
    >
  ): Promise<void> {
    const { emailAluno, nomeAluno, nomeVantagem, codigoCupom } = payload;

    console.log("─── [EmailService] Enviando email: Cupom do Aluno ────────");
    console.log(`Para:      ${emailAluno}`);
    console.log(`Assunto:   Seu cupom para "${nomeVantagem}" chegou!`);
    console.log(`Corpo:     Olá, ${nomeAluno}! Seu resgate foi confirmado.`);
    console.log(`           Vantagem:    ${nomeVantagem}`);
    console.log(`           Código:      ${codigoCupom}`);
    console.log(`           Apresente este código na troca presencial.`);
    console.log("──────────────────────────────────────────────────────────");
  }

  // ─── US07: Aviso para a empresa parceira após resgate ───────

  static async notificarEmpresaResgate(
    payload: Pick<
      EmailResgatePayload,
      "emailEmpresa" | "nomeEmpresa" | "nomeAluno" | "nomeVantagem" | "codigoCupom"
    >
  ): Promise<void> {
    const { emailEmpresa, nomeEmpresa, nomeAluno, nomeVantagem, codigoCupom } =
      payload;

    console.log("─── [EmailService] Enviando email: Aviso à Empresa ───────");
    console.log(`Para:      ${emailEmpresa}`);
    console.log(`Assunto:   Resgate confirmado — verifique o código ${codigoCupom}`);
    console.log(`Corpo:     Olá, ${nomeEmpresa}!`);
    console.log(`           O aluno ${nomeAluno} resgatou a vantagem "${nomeVantagem}".`);
    console.log(`           Código de verificação: ${codigoCupom}`);
    console.log(`           Confirme este código na troca presencial.`);
    console.log("──────────────────────────────────────────────────────────");
  }
}
