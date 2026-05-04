# Sistema de Moeda Estudantil

Sistema web para reconhecimento do mérito estudantil por meio de uma moeda virtual. Professores distribuem moedas aos alunos como reconhecimento, e os alunos podem trocá-las por vantagens (produtos e descontos) oferecidas por empresas parceiras.

## Funcionalidades

**Aluno**
- Cadastro com nome, email, CPF, RG, endereço, instituição e curso
- Consulta de saldo e extrato de transações
- Visualização de vantagens disponíveis com descrição, foto e custo
- Troca de moedas por vantagens com geração de cupom por email

**Professor**
- Envio de moedas para alunos da mesma instituição com mensagem obrigatória
- Consulta de extrato de envios realizados

**Empresa Parceira**
- Cadastro de vantagens (descrição, foto, custo em moedas)
- Listagem e gerenciamento das vantagens cadastradas

**Autenticação**
- Login com email e senha para todos os perfis
- Proteção de rotas por papel (Aluno / Professor / Empresa)

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 (App Router, SSR) |
| Linguagem | TypeScript 5 |
| ORM | Prisma 5 |
| Banco de dados | PostgreSQL |
| Autenticação | NextAuth.js 4 (JWT + bcryptjs) |
| Email | Nodemailer (SMTP) |
| Validação | Zod |
| Estilo | Tailwind CSS 3 |

## Estrutura do projeto

```
Sistema-Moeda-Estudantil/
├── Artefatos/
│   ├── HISTORIAS_DE_USUARIO.md
│   └── Diagramas/
│       ├── Diagrama-de-Classes.png
│       ├── Diagrama-de-Componentes.png
│       ├── Diagrama_CasoDeUso.png
│       └── Modelo_ER.png
└── Codigo/
    ├── prisma/
    │   ├── schema.prisma
    │   └── seed.ts
    └── src/
        ├── actions/          # Server Actions (controllers)
        ├── services/         # Regras de negócio
        ├── lib/              # Auth, Prisma client, utilitários
        ├── components/       # Componentes React reutilizáveis
        └── app/
            ├── (auth)/       # Login e cadastro
            ├── (dashboard)/  # Painéis por papel
            │   ├── aluno/
            │   ├── professor/
            │   └── empresa/
            └── api/auth/     # Rota NextAuth
```

## Pré-requisitos

- Node.js 18+
- PostgreSQL rodando localmente (ou via Docker)

## Configuração

1. Clone o repositório e entre na pasta do código:

```bash
cd Codigo
npm install
```

2. Crie o arquivo `.env` na pasta `Codigo/` com as seguintes variáveis:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/moeda_estudantil"

NEXTAUTH_SECRET="sua-chave-secreta"
NEXTAUTH_URL="http://localhost:3000"

SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="seu@email.com"
SMTP_PASS="sua-senha-smtp"
EMAIL_FROM="noreply@example.com"
```

3. Execute as migrações e popule o banco com dados iniciais:

```bash
npm run db:migrate
npm run db:seed
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia build de produção |
| `npm run db:migrate` | Executa migrações do banco |
| `npm run db:seed` | Popula o banco com dados iniciais |
| `npm run db:studio` | Abre o Prisma Studio |
| `npm run db:generate` | Regenera o Prisma Client |

## Arquitetura

O sistema segue uma arquitetura em 4 camadas:

```
View (Pages SSR)
     ↓
Controller (Server Actions)
     ↓
Service (Regras de negócio + Email)
     ↓
Persistência (Prisma ORM → PostgreSQL)
```

Transações críticas (envio de moedas, resgate de vantagens) são executadas de forma atômica via `prisma.$transaction`, garantindo consistência do saldo mesmo em falhas parciais.

## Diagramas

Os diagramas de casos de uso, classes, componentes e o modelo ER estão disponíveis em [`Artefatos/Diagramas/`](Artefatos/Diagramas/).

As histórias de usuário que guiaram o desenvolvimento estão em [`Artefatos/HISTORIAS_DE_USUARIO.md`](Artefatos/HISTORIAS_DE_USUARIO.md).
