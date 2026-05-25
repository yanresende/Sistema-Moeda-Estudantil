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
| Email | EmailJS (API) |
| Filas | RabbitMQ 3.13 (via Docker) |
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
- Docker Desktop (para o RabbitMQ)
- PostgreSQL rodando localmente (porta 5432)

## Inicialização

> Todos os comandos devem ser executados dentro da pasta `Codigo/`.

### 1. Instalar dependências

```bash
cd Codigo
npm install
```

### 2. Configurar variáveis de ambiente

Crie o arquivo `.env` na pasta `Codigo/` com as seguintes variáveis:

```env
# Banco de dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/moeda_estudantil"

# NextAuth
NEXTAUTH_SECRET="sua-chave-secreta"
NEXTAUTH_URL="http://localhost:3000"

# EmailJS
EMAILJS_SERVICE_ID="seu-service-id"
EMAILJS_PUBLIC_KEY="sua-public-key"
EMAILJS_PRIVATE_KEY="sua-private-key"
EMAILJS_TEMPLATE_RECEBEU_MOEDAS="template-id"
EMAILJS_TEMPLATE_CUPOM_ALUNO="template-id"
EMAILJS_TEMPLATE_NOTIFICACAO_EMPRESA="template-id"

# RabbitMQ
RABBITMQ_URL="amqp://guest:guest@localhost:5672"

# Renovação semestral
ADMIN_SECRET="sua-chave-admin"
SALDO_INICIAL_PROFESSOR=1000
```

### 3. Subir o RabbitMQ (Docker)

```bash
npm run infra:up
```

Painel de gerenciamento disponível em [http://localhost:15672](http://localhost:15672) (login: `guest` / `guest`).

### 4. Configurar o banco de dados

```bash
npm run db:generate   # gera o Prisma Client
npm run db:migrate    # executa as migrations
npm run db:seed       # popula dados iniciais (opcional)
```

### 5. Iniciar os serviços (3 terminais separados)

**Terminal 1 — Aplicação Next.js:**
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000).

**Terminal 2 — Worker de email (RabbitMQ + EmailJS):**
```bash
npm run worker
```

### Parar tudo

```bash
npm run infra:down   # para o RabbitMQ (Docker)
# Ctrl+C nos outros terminais
```

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia build de produção |
| `npm run worker` | Worker de email (RabbitMQ + EmailJS) |
| `npm run infra:up` | Sobe o RabbitMQ via Docker |
| `npm run infra:down` | Para o RabbitMQ via Docker |
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
