const express = require("express");
const router = express.Router();
const payment = require("../controllers/payment");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: The Payment API for handling payment creation and management
 */

router.route("/create_payment_intent").post(payment.createPayment);

module.exports = router;
