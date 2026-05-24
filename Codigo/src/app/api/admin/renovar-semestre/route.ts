import { NextRequest, NextResponse } from "next/server";
import { publishToQueue } from "@/lib/rabbitmq";
import { Queues, RenovacaoSemestreMsg } from "@/lib/queues";

const SALDO_INICIAL = parseInt(process.env.SALDO_INICIAL_PROFESSOR ?? "1000", 10);

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({})) as { semestre?: string };

  const now = new Date();
  const semestre =
    body.semestre ??
    `${now.getFullYear()}/${now.getMonth() < 6 ? 1 : 2}`;

  const message: RenovacaoSemestreMsg = {
    semestre,
    saldoInicial: SALDO_INICIAL,
  };

  await publishToQueue(Queues.SEMESTRE_RENOVACAO, message);

  return NextResponse.json({ ok: true, semestre, saldoInicial: SALDO_INICIAL });
}
