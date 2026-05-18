/**
 * Worker de Emails — Sistema de Moeda Estudantil
 *
 * Processo Node.js independente que consome as filas RabbitMQ e
 * despacha os emails transacionais via EmailService.
 *
 * Rodar em paralelo com o Next.js:
 *   npm run worker
 *
 * Filas consumidas:
 *   email.moedas  → notifica aluno ao receber moedas (US03)
 *   email.resgate → envia cupom ao aluno + aviso à empresa (US06 / US07)
 */

import amqplib, { Channel, ConsumeMessage } from "amqplib";
import { EmailService } from "../src/services/email.service";
import type {
  EmailMoedasPayload,
  EmailResgatePayload,
} from "../src/services/queue.service";

// ─── Configuração ─────────────────────────────────────────────

const RABBITMQ_URL = process.env.RABBITMQ_URL ?? "amqp://localhost";

const QUEUES = {
  EMAIL_MOEDAS: "email.moedas",
  EMAIL_RESGATE: "email.resgate",
} as const;

// ─── Helpers ──────────────────────────────────────────────────

function parseMessage<T>(msg: ConsumeMessage): T {
  return JSON.parse(msg.content.toString()) as T;
}

function ack(ch: Channel, msg: ConsumeMessage): void {
  ch.ack(msg);
}

function nack(ch: Channel, msg: ConsumeMessage): void {
  // requeue: false → mensagem vai para dead-letter (evita loop infinito)
  ch.nack(msg, false, false);
}

// ─── Consumers ────────────────────────────────────────────────

async function consumeEmailMoedas(ch: Channel): Promise<void> {
  await ch.assertQueue(QUEUES.EMAIL_MOEDAS, { durable: true });

  ch.consume(QUEUES.EMAIL_MOEDAS, async (msg) => {
    if (!msg) return;

    try {
      const payload = parseMessage<EmailMoedasPayload>(msg);
      console.log(`[Worker] Processando email.moedas → ${payload.emailAluno}`);

      await EmailService.notificarAlunoRecebeuMoedas(payload);
      ack(ch, msg);

      console.log(`[Worker] email.moedas concluído → ${payload.emailAluno}`);
    } catch (err) {
      console.error("[Worker] Erro em email.moedas:", err);
      nack(ch, msg);
    }
  });

  console.log(`[Worker] Ouvindo fila: ${QUEUES.EMAIL_MOEDAS}`);
}

async function consumeEmailResgate(ch: Channel): Promise<void> {
  await ch.assertQueue(QUEUES.EMAIL_RESGATE, { durable: true });

  ch.consume(QUEUES.EMAIL_RESGATE, async (msg) => {
    if (!msg) return;

    try {
      const payload = parseMessage<EmailResgatePayload>(msg);
      console.log(`[Worker] Processando email.resgate → ${payload.emailAluno} | cupom: ${payload.codigoCupom}`);

      // Envia os dois emails em paralelo (aluno + empresa)
      await Promise.all([
        EmailService.enviarCupomAluno(payload),
        EmailService.notificarEmpresaResgate(payload),
      ]);

      ack(ch, msg);
      console.log(`[Worker] email.resgate concluído → cupom: ${payload.codigoCupom}`);
    } catch (err) {
      console.error("[Worker] Erro em email.resgate:", err);
      nack(ch, msg);
    }
  });

  console.log(`[Worker] Ouvindo fila: ${QUEUES.EMAIL_RESGATE}`);
}

// ─── Inicialização ────────────────────────────────────────────

async function start(): Promise<void> {
  console.log(`[Worker] Conectando ao RabbitMQ em ${RABBITMQ_URL}...`);

  const connection = await amqplib.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  // Processa uma mensagem por vez (backpressure)
  channel.prefetch(1);

  await consumeEmailMoedas(channel);
  await consumeEmailResgate(channel);

  console.log("[Worker] Pronto. Aguardando mensagens...\n");

  // Graceful shutdown
  process.on("SIGINT", async () => {
    console.log("\n[Worker] Encerrando...");
    await channel.close();
    await connection.close();
    process.exit(0);
  });
}

start().catch((err) => {
  console.error("[Worker] Falha na inicialização:", err);
  process.exit(1);
});
