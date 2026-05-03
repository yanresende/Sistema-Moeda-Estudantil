import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const EmailService = {
  // US06 — Cupom enviado ao aluno após resgate
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
    return transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: emailAluno,
      subject: `Seu cupom de resgate — ${nomeVantagem}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto">
          <h2>Parabéns, ${nomeAluno}!</h2>
          <p>Você resgatou a vantagem: <strong>${nomeVantagem}</strong></p>
          <div style="background:#f0f9ff;border:2px dashed #0284c7;border-radius:8px;padding:24px;text-align:center;margin:24px 0">
            <p style="margin:0;font-size:14px;color:#64748b">Seu código de cupom</p>
            <p style="margin:8px 0 0;font-size:36px;font-weight:bold;letter-spacing:8px;color:#0284c7">${codigoCupom}</p>
          </div>
          <p>Apresente este código na empresa parceira para resgatar sua vantagem.</p>
        </div>
      `,
    });
  },

  // US07 — Notificação enviada à empresa quando um aluno resgata
  async notificarEmpresa({
    emailEmpresa,
    nomeEmpresa,
    nomeVantagem,
    codigoCupom,
    nomeAluno,
  }: {
    emailEmpresa: string;
    nomeEmpresa: string;
    nomeVantagem: string;
    codigoCupom: string;
    nomeAluno: string;
  }) {
    return transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: emailEmpresa,
      subject: `Novo resgate de vantagem — ${nomeVantagem}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto">
          <h2>Novo resgate em ${nomeEmpresa}</h2>
          <p>O aluno <strong>${nomeAluno}</strong> resgatou: <strong>${nomeVantagem}</strong></p>
          <div style="background:#f0fdf4;border:2px dashed #16a34a;border-radius:8px;padding:24px;text-align:center;margin:24px 0">
            <p style="margin:0;font-size:14px;color:#64748b">Código do cupom a conferir</p>
            <p style="margin:8px 0 0;font-size:36px;font-weight:bold;letter-spacing:8px;color:#16a34a">${codigoCupom}</p>
          </div>
          <p>Verifique este código quando o aluno apresentar o cupom.</p>
        </div>
      `,
    });
  },
};
