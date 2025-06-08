const paymentService = require('../services/payment.service');

exports.createCharge = async (req, res, next) => {
  try {
    const { plan, amount, currency } = req.body;
    const userId = req.user.id;

    const payment = await paymentService.createCharge({
      userId,
      plan,
      amount,
      currency,
    });

    res.status(201).json({ payment });
  } catch (err) {
    next(err);
  }
};

exports.getPaymentStatus = async (req, res, next) => {
  try {
    const { chargeId } = req.params;
    const payment = await paymentService.updatePaymentStatus(chargeId);
    res.json({ payment });
  } catch (err) {
    next(err);
  }
};
