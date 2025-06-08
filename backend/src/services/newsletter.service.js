// services/newsletter.service.js
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const { SibApiV3Sdk, NEWSLETTER_LIST_ID } = require('../config/newsletter');
const { sendEmail } = require('../utils/email.util');

const contactsApi = new SibApiV3Sdk.ContactsApi();

async function subscribe(name, email) {
  // 1) Verifica se já existe
  const exists = await NewsletterSubscriber.findOne({ email });
  if (exists) {
    throw new Error('E-mail já cadastrado.');
  }

  // 2) Cria no Mongo com status pending
  const subscriber = new NewsletterSubscriber({ name, email, status: 'pending' });
  await subscriber.save();

  // 3) Adiciona na lista do Brevo
  const createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  createContact.attributes = { FIRSTNAME: name };
  createContact.listIds = [NEWSLETTER_LIST_ID];
  createContact.updateEnabled = false; // não atualiza contato existente

  await contactsApi.createContact(createContact);

  // 4) Atualiza status para subscribed
  subscriber.status = 'subscribed';
  await subscriber.save();

  // 5) Envia e-mail de boas-vindas
  await sendEmail({
    to: email,
    subject: '🎉 Bem-vindo à nossa newsletter!',
    html: `<p>Olá ${name},</p><p>Obrigado por se inscrever na nossa newsletter KRMCrypto! Em breve você receberá as novidades.</p>`
  });

  return subscriber;
}

module.exports = {
  subscribe
};
