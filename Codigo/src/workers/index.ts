import { config } from "dotenv";
config();

async function main() {
  const { startEmailWorker } = await import("./email.worker");
  const { startSemesterWorker } = await import("./semester.worker");

  await Promise.all([startEmailWorker(), startSemesterWorker()]);

  console.log("[workers] Todos os workers iniciados.");
}

main().catch((err) => {
  console.error("[workers] Erro fatal:", err);
  process.exit(1);
});
