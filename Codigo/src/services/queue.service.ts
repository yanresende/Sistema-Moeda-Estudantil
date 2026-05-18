import { getRabbitChannel, QUEUES } from "@/lib/rabbitmq";

// ─── Payloads ─────────────────────────────────────────────────

/** Dados enviados quando professor distribui moedas a um aluno */
export type EmailMoedasPayload = {
  emailAluno: string;
  nomeAluno: string;
  nomeProfessor: string;
  quantidade: number;
  motivo: string;
};

/** Dados enviados quando aluno resgata uma vantagem */
export type EmailResgatePayload = {
  emailAluno: string;
  nomeAluno: string;
  emailEmpresa: string;
  nomeEmpresa: string;
  nomeVantagem: string;
  codigoCupom: string;
};

// ─── QueueService ─────────────────────────────────────────────

/**
 * Responsável por publicar mensagens nas filas do RabbitMQ.
 * As actions chamam estes métodos em vez de chamar o EmailService diretamente,
 * tornando o envio de email assíncrono e não-bloqueante.
 */
export class QueueService {
  /**
   * Publica um evento de envio de moedas na fila email.moedas.
   * O worker irá consumir e enviar o email de notificação ao aluno.
   */
  static async publishEmailMoedas(payload: EmailMoedasPayload): Promise<void> {
    const ch = await getRabbitChannel();
    const message = Buffer.from(JSON.stringify(payload));

    ch.sendToQueue(QUEUES.EMAIL_MOEDAS, message, {
      persistent: true,          // mensagem sobrevive a restart do broker
      contentType: "application/json",
    });

    console.log(`[QueueService] Evento email.moedas publicado para: ${payload.emailAluno}`);
  }

  /**
   * Publica um evento de resgate de vantagem na fila email.resgate.
   * O worker irá consumir e enviar: (1) cupom ao aluno, (2) aviso à empresa.
   */
  static async publishEmailResgate(payload: EmailResgatePayload): Promise<void> {
    const ch = await getRabbitChannel();
    const message = Buffer.from(JSON.stringify(payload));

    ch.sendToQueue(QUEUES.EMAIL_RESGATE, message, {
      persistent: true,
      contentType: "application/json",
    });

    console.log(`[QueueService] Evento email.resgate publicado para: ${payload.emailAluno} | cupom: ${payload.codigoCupom}`);
  }
}
