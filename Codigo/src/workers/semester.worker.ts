import amqp from "amqplib";
import { prisma } from "@/lib/prisma";
import { Queues, RenovacaoSemestreMsg } from "@/lib/queues";

const RABBITMQ_URL = process.env.RABBITMQ_URL ?? "amqp://guest:guest@localhost:5672";

export async function startSemesterWorker() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  channel.prefetch(1);

  await channel.assertQueue(Queues.SEMESTRE_RENOVACAO, { durable: true });

  channel.consume(Queues.SEMESTRE_RENOVACAO, async (msg) => {
    if (!msg) return;
    try {
      const data = JSON.parse(msg.content.toString()) as RenovacaoSemestreMsg;
      console.log(`[semester.worker] Renovando semestre ${data.semestre} — saldo: ${data.saldoInicial}`);

      const { count } = await prisma.conta.updateMany({
        where: { professorId: { not: null } },
        data: { saldo: data.saldoInicial },
      });

      console.log(`[semester.worker] ${count} professor(es) renovado(s).`);
      channel.ack(msg);
    } catch (err) {
      console.error("[semester.worker] Erro na renovação:", err);
      channel.nack(msg, false, false);
    }
  });

  console.log("[semester.worker] Aguardando renovação semestral...");
}
