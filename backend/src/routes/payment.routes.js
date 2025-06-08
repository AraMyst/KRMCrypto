// routes/payment.routes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/', protect, paymentController.createCharge);
router.get('/:chargeId', protect, paymentController.getPaymentStatus);

module.exports = router;
