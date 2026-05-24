import amqp from "amqplib";
import { EmailService } from "@/services/email.service";
import {
  Queues,
  MoedasRecebidasMsg,
  CupomAlunoMsg,
  NotificacaoEmpresaMsg,
} from "@/lib/queues";

const RABBITMQ_URL = process.env.RABBITMQ_URL ?? "amqp://guest:guest@localhost:5672";

export async function startEmailWorker() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  channel.prefetch(5);

  const queues = [
    Queues.EMAIL_MOEDAS_RECEBIDAS,
    Queues.EMAIL_CUPOM_ALUNO,
    Queues.EMAIL_NOTIFICACAO_EMPRESA,
  ];

  for (const q of queues) {
    await channel.assertQueue(q, { durable: true });
  }

  channel.consume(Queues.EMAIL_MOEDAS_RECEBIDAS, async (msg) => {
    if (!msg) return;
    try {
      const data = JSON.parse(msg.content.toString()) as MoedasRecebidasMsg;
      await EmailService.notificarAlunoRecebeuMoedas(data);
      channel.ack(msg);
    } catch (err) {
      console.error("[email.worker] moedas_recebidas:", err);
      channel.nack(msg, false, false);
    }
  });

  channel.consume(Queues.EMAIL_CUPOM_ALUNO, async (msg) => {
    if (!msg) return;
    try {
      const data = JSON.parse(msg.content.toString()) as CupomAlunoMsg;
      await EmailService.enviarCupomAluno(data);
      channel.ack(msg);
    } catch (err) {
      console.error("[email.worker] cupom_aluno:", err);
      channel.nack(msg, false, false);
    }
  });

  channel.consume(Queues.EMAIL_NOTIFICACAO_EMPRESA, async (msg) => {
    if (!msg) return;
    try {
      const data = JSON.parse(msg.content.toString()) as NotificacaoEmpresaMsg;
      await EmailService.notificarEmpresaResgate(data);
      channel.ack(msg);
    } catch (err) {
      console.error("[email.worker] notificacao_empresa:", err);
      channel.nack(msg, false, false);
    }
  });

  console.log("[email.worker] Aguardando mensagens de email...");
}
