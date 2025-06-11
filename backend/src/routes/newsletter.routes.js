// routes/newsletter.routes.js
const express = require('express');
const router = express.Router();
const newsletterService = require('../services/newsletter.service');

// accepts optional name and required email
router.post('/subscribe', async (req, res) => {
  const { name, email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'E-mail é obrigatório.' });
  }

  try {
    const [firstName, ...rest] = (name || '').trim().split(' ');
    const lastName = rest.join(' ');

    const subscriber = await newsletterService.subscribe({ firstName, lastName, email });
    return res.status(201).json({
      message: 'Inscrição realizada com sucesso!',
      subscriber: {
        id: subscriber._id,
        firstName: subscriber.firstName,
        lastName: subscriber.lastName,
        email: subscriber.email,
        status: subscriber.status
      }
    });
  } catch (err) {
    if (err.message === 'E-mail já cadastrado.') {
      return res.status(409).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: 'Erro ao processar inscrição.' });
  }
});

module.exports = router;
