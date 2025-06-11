// controllers/newsletter.controller.js
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const { SibApiV3Sdk, BREVO_LIST_ID } = require('../config/newsletter');

const contactsApi = new SibApiV3Sdk.ContactsApi();

exports.subscribe = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  try {
    const [firstName, ...rest] = name.trim().split(' ');
    const lastName = rest.join(' ');

    // 1) Salva no Mongo com status 'pending'
    let subscriber = await NewsletterSubscriber.create({ firstName, lastName, email, status: 'pending' });

    // 2) Chama API Brevo para criar/adicionar na lista
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    createContact.attributes = { FIRSTNAME: firstName, LASTNAME: lastName };
    createContact.listIds = [BREVO_LIST_ID];
    createContact.updateEnabled = false; // do not overwrite existing contacts

    await contactsApi.createContact(createContact);

    // 3) Se OK, atualiza status para 'subscribed'
    subscriber.status = 'subscribed';
    await subscriber.save();

    return res.status(201).json({
      message: 'Subscription successful!',
      subscriber: {
        id: subscriber._id,
        firstName: subscriber.firstName,
        lastName: subscriber.lastName,
        email: subscriber.email,
        status: subscriber.status
      }
    });
  } catch (err) {
    console.error('Error subscribing to newsletter:', err);

    // Se já existir, podemos devolver 409
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already subscribed.' });
    }

    return res.status(500).json({ message: 'Internal error processing subscription.' });
  }
};
