# iDontKnowCrypto Frontend (en)

Aplicação web em **Next.js** que exibe notícias e análises de criptomoedas para o público internacional. Inclui autenticação, sistema de assinaturas, newsletter e integração com preços de criptos em tempo real.

## Tecnologias

- [Next.js 14](https://nextjs.org/) + React 18
- TypeScript estrito
- Tailwind CSS para estilos
- Axios para requisições HTTP

## Pré‑requisitos

- Node.js 16 ou superior
- URL do backend exposta em `NEXT_PUBLIC_API_URL`

## Instalação

```bash
# Clone o repositório e acesse a pasta
cd frontend-en

# Instale as dependências
npm install

# Copie o arquivo de exemplo e ajuste a URL do backend
cp .env.local .env.local
# edite .env.local se necessário
```

## Scripts

- `npm run dev` – inicia o servidor de desenvolvimento
- `npm run build` – gera a versão de produção
- `npm start` – executa a build
- `npm run lint` – executa o ESLint

## Principais funcionalidades

- **Página inicial dinâmica** ordena as seções de notícias pelo país do usuário via geolocalização.
- **Menu de categorias** e páginas para cada região/tema (UK, USA, Bitcoin etc.).
- **Ticker de preços** de criptomoedas atualizado periodicamente.
- **Autenticação** com login e registro usando JWT (contexto `AuthProvider`).
- **Área do usuário** para atualizar perfil, gerenciar assinatura e método de pagamento.
- **Newsletter** com formulário independente e banners laterais de captura.
- **Busca de artigos** através de dropdown ou modal.
- Componentização com **Context API** e hooks personalizados.

## Estrutura resumida

```
frontend-en/
├── public/            # imagens e assets estáticos
├── src/
│   ├── components/    # Header, Footer, banners, etc.
│   ├── contexts/      # Auth, Crypto e Newsletter providers
│   ├── hooks/         # hooks como useAuth, useCryptoPrices
│   ├── pages/         # rotas Next.js (notícias, conta, auth…)
│   ├── services/      # integração com APIs de pagamento e usuário
│   ├── styles/        # arquivos Tailwind
│   └── utils/         # helpers (apiClient, geo, date…)
└── package.json
```

## Variáveis de Ambiente

Crie `.env.local` na raiz com:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Essa URL é utilizada pelo `apiClient.ts` para comunicar com o backend.

## Executando em desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000` (porta padrão do Next.js).

---

Com esse guia você consegue rodar o frontend em inglês localmente e adaptar conforme as necessidades do projeto.
