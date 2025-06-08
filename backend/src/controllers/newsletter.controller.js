// controllers/newsletter.controller.js
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const { SibApiV3Sdk, NEWSLETTER_LIST_ID } = require('../config/newsletter');

const contactsApi = new SibApiV3Sdk.ContactsApi();

exports.subscribe = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
  }

  try {
    // 1) Salva no Mongo com status 'pending'
    let subscriber = await NewsletterSubscriber.create({ name, email, status: 'pending' });

    // 2) Chama API Brevo para criar/adicionar na lista
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    createContact.attributes = { FIRSTNAME: name };
    createContact.listIds = [NEWSLETTER_LIST_ID];
    createContact.updateEnabled = false; // não sobrescrever contatos existentes

    await contactsApi.createContact(createContact);

    // 3) Se OK, atualiza status para 'subscribed'
    subscriber.status = 'subscribed';
    await subscriber.save();

    return res.status(201).json({
      message: 'Inscrição realizada com sucesso!',
      subscriber: {
        id: subscriber._id,
        name: subscriber.name,
        email: subscriber.email,
        status: subscriber.status
      }
    });
  } catch (err) {
    console.error('Erro ao inscrever na newsletter:', err);

    // Se já existir, podemos devolver 409
    if (err.code === 11000) {
      return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }

    return res.status(500).json({ message: 'Erro interno ao processar inscrição.' });
  }
};
