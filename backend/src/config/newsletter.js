// config/newsletter.js
const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];

// Tome cuidado de NÃO comitar sua chave no repo.
// Defina em .env: BREVO_API_KEY=xkeysib-...
apiKey.apiKey = process.env.BREVO_API_KEY || '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';

// O ID da lista KRMCrypto
const NEWSLETTER_LIST_ID = Number(process.env.BREVO_LIST_ID) || 2;

module.exports = {
  SibApiV3Sdk,
  NEWSLETTER_LIST_ID
};
