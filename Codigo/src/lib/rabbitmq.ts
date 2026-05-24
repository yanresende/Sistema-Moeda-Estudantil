import amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL ?? "amqp://guest:guest@localhost:5672";

let connection: amqp.Connection | null = null;
let channel: amqp.Channel | null = null;

async function connect(): Promise<amqp.Channel> {
  connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();

  connection.on("close", () => { connection = null; channel = null; });
  connection.on("error", () => { connection = null; channel = null; });

  return channel;
}

async function getChannel(): Promise<amqp.Channel> {
  if (channel) return channel;
  return connect();
}

export async function publishToQueue(queue: string, message: object): Promise<void> {
  const ch = await getChannel();
  await ch.assertQueue(queue, { durable: true });
  ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
}
