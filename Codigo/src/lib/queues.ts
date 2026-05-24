export const Queues = {
  EMAIL_MOEDAS_RECEBIDAS:    "email.moedas_recebidas",
  EMAIL_CUPOM_ALUNO:         "email.cupom_aluno",
  EMAIL_NOTIFICACAO_EMPRESA: "email.notificacao_empresa",
  SEMESTRE_RENOVACAO:        "semestre.renovacao",
} as const;

export type MoedasRecebidasMsg = {
  emailAluno: string;
  nomeAluno: string;
  nomeProfessor: string;
  quantidade: number;
  motivo: string;
};

export type CupomAlunoMsg = {
  emailAluno: string;
  nomeAluno: string;
  nomeVantagem: string;
  codigoCupom: string;
};

export type NotificacaoEmpresaMsg = {
  emailEmpresa: string;
  nomeEmpresa: string;
  nomeAluno: string;
  nomeVantagem: string;
  codigoCupom: string;
};

export type RenovacaoSemestreMsg = {
  semestre: string;
  saldoInicial: number;
};
