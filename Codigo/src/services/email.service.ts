const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";

async function sendEmail(templateId: string, templateParams: Record<string, string | number>) {
  const res = await fetch(EMAILJS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id:      process.env.EMAILJS_SERVICE_ID,
      template_id:     templateId,
      user_id:         process.env.EMAILJS_PUBLIC_KEY,
      accessToken:     process.env.EMAILJS_PRIVATE_KEY,
      template_params: templateParams,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`EmailJS error ${res.status}: ${body}`);
  }
}

export const EmailService = {
  // US03 — Notificação ao aluno quando recebe moedas de um professor
  async notificarAlunoRecebeuMoedas({
    emailAluno,
    nomeAluno,
    nomeProfessor,
    quantidade,
    motivo,
  }: {
    emailAluno: string;
    nomeAluno: string;
    nomeProfessor: string;
    quantidade: number;
    motivo: string;
  }) {
    return sendEmail(process.env.EMAILJS_TEMPLATE_RECEBEU_MOEDAS!, {
      to_email:       emailAluno,
      to_name:        nomeAluno,
      professor_nome: nomeProfessor,
      quantidade,
      motivo,
    });
  },

  // US06 — Cupom enviado ao aluno após resgate de vantagem
  async enviarCupomAluno({
    emailAluno,
    nomeAluno,
    nomeVantagem,
    codigoCupom,
  }: {
    emailAluno: string;
    nomeAluno: string;
    nomeVantagem: string;
    codigoCupom: string;
  }) {
    return sendEmail(process.env.EMAILJS_TEMPLATE_CUPOM_ALUNO!, {
      to_email:      emailAluno,
      to_name:       nomeAluno,
      vantagem_nome: nomeVantagem,
      codigo_cupom:  codigoCupom,
      qr_code_url:   `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(codigoCupom)}`,
    });
  },

  // US07 — Notificação à empresa quando um aluno resgata uma vantagem
  async notificarEmpresaResgate({
    emailEmpresa,
    nomeEmpresa,
    nomeAluno,
    nomeVantagem,
    codigoCupom,
  }: {
    emailEmpresa: string;
    nomeEmpresa: string;
    nomeAluno: string;
    nomeVantagem: string;
    codigoCupom: string;
  }) {
    return sendEmail(process.env.EMAILJS_TEMPLATE_CUPOM_ALUNO!, {
      to_email:      emailEmpresa,
      to_name:       nomeEmpresa,
      aluno_nome:    `Aluno resgatante: ${nomeAluno}`,
      vantagem_nome: nomeVantagem,
      codigo_cupom:  codigoCupom,
      qr_code_url:   `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(codigoCupom)}`,
    });
  },
};