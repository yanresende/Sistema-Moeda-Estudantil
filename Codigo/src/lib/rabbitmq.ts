import amqplib, { Connection, Channel } from "amqplib";

// ─── Filas disponíveis no sistema ────────────────────────────
export const QUEUES = {
  EMAIL_MOEDAS: "email.moedas",
  EMAIL_RESGATE: "email.resgate",
} as const;

// ─── Singleton de conexão e canal ────────────────────────────
let connection: Connection | null = null;
let channel: Channel | null = null;

/**
 * Retorna um canal RabbitMQ reutilizável (singleton).
 * Declara todas as filas do sistema automaticamente.
 */
export async function getRabbitChannel(): Promise<Channel> {
  if (channel) return channel;

  const url = process.env.RABBITMQ_URL ?? "amqp://localhost";
  connection = await amqplib.connect(url);
  channel = await connection.createChannel();

  // Declara todas as filas como durable (sobrevivem a restart do broker)
  for (const queue of Object.values(QUEUES)) {
    await channel.assertQueue(queue, { durable: true });
  }

  // Fecha canal/conexão ao encerrar o processo
  process.once("beforeExit", async () => {
    await channel?.close();
    await connection?.close();
  });

  console.log("[RabbitMQ] Conectado e filas declaradas:", Object.values(QUEUES));
  return channel;
}
