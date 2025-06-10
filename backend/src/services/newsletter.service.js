const { SibApiV3Sdk, BREVO_LIST_ID } = require('../config/newsletter');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const { sendEmail } = require('../utils/email.util');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const contactsApi = new SibApiV3Sdk.ContactsApi();

async function subscribe({ firstName, lastName, email }) {
  // 1) Verifica duplicado no Mongo
  if (await NewsletterSubscriber.findOne({ email })) {
    throw new Error('E-mail já cadastrado.');
  }

  // 2) Cria no Mongo com status pending
  const subscriber = new NewsletterSubscriber({
    firstName,
    lastName,
    email,
    status: 'pending'
  });
  await subscriber.save();

  // 3) Cria contato no Brevo
  const createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  createContact.attributes = { FIRSTNAME: firstName, LASTNAME: lastName };
  createContact.listIds = [ BREVO_LIST_ID ];
  createContact.updateEnabled = false;

  try {
    await contactsApi.createContact(createContact);
  } catch (err) {
    // se já existe no Brevo, apenas adiciona à lista
    if (err.response && err.response.body.code === 'duplicate_parameter') {
      const updateContact = new SibApiV3Sdk.UpdateContact();
      updateContact.listIds = [ BREVO_LIST_ID ];
      await contactsApi.updateContact(email, updateContact);
    } else {
      throw err;
    }
  }

  // 4) Atualiza status no Mongo
  subscriber.status = 'subscribed';
  await subscriber.save();

  // 5) Envia e-mail de boas-vindas
  await sendEmail({
    to: email,
    subject: '🎉 Bem-vindo à nossa newsletter!',
    html: `
      <p>Olá ${firstName},</p>
      <p>Obrigado por se inscrever na nossa newsletter KRMCrypto!</p>
      <p>Em breve você receberá as novidades.</p>
    `
  });

  return subscriber;
}

module.exports = {
  subscribe
};
