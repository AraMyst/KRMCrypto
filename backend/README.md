
# Crypto Newsletter Backend

API REST para gerenciar usuários, assinaturas, newsletter e preços de criptomoedas.

## Tecnologias
- Node.js
- Express
- MongoDB + Mongoose
- JWT para autenticação
- Nodemailer + Brevo (Sendinblue) para envio de emails
- Coinbase Commerce para pagamentos em cripto

## Pré-requisitos
- Node.js >= 14
- MongoDB (cluster ou local)
- Conta Brevo (Sendinblue)
- Conta Coinbase Commerce

## Instalação
1. Clone o repositório:
   ```bash
   git clone <repo-url>
   cd <project-folder>
````

2. Instale as dependências:

   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz com as variáveis (exemplo abaixo).

## Variáveis de Ambiente

```dotenv
# MongoDB\ n MONGODB_URI=mongodb+srv://<db_username>:<db_password>@cluster.mongodb.net/yourDB

# App\ n NODE_ENV=development
PORT=3000

# JWT\ n JWT_SECRET=seu_secret\ n JWT_EXPIRES_IN=7d

# Email (Brevo)\ n SMTP_HOST=smtp-relay.sendinblue.com
SMTP_PORT=587
SMTP_USER=seu_usuario
SMTP_PASS=sua_senha
BREVO_LIST_ID=KRMCrypto
EMAIL_API_KEY=xkeysib-...

# Coinbase Commerce
COINBASE_API_KEY=579038d7-0e41-47f9-b643-04a51447220f
# CoinGecko Demo API
COINGECKO_API_KEY=your_coingecko_key
```

## Executando

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

## Estrutura do Projeto

```
├── config/
│   └── database.js
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── app.js
└── package.json
```

## Endpoints Principais

* `POST /api/auth/register` – cadastro de usuário
* `POST /api/auth/login` – login JWT
* `GET /api/subscriptions/me` – dados da assinatura do usuário
* `POST /api/newsletter/subscribe` – cadastra email na newsletter
* `GET /api/crypto/prices` – lista de preços de criptos

Para detalhes de todas as rotas, veja a documentação Swagger (se implementado).

```

---

Com esses arquivos sua base de backend estará pronta para iniciar o desenvolvimento e testes locais.

```
