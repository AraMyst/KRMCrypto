// config/newsletter.js
const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];

// Tome cuidado de NÃO comitar sua chave no repo.
// Defina em .env: BREVO_API_KEY=xkeysib-...
apiKey.apiKey = process.env.BREVO_API_KEY;
if (!apiKey.apiKey) {
  console.warn('⚠️  BREVO_API_KEY not set. Newsletter emails will fail.');
}

// O ID da lista KRMCrypto
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID) || 2;

module.exports = {
  SibApiV3Sdk,
  BREVO_LIST_ID
};
