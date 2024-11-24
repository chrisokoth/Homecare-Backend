/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentIntent:
 *       type: object
 *       properties:
 *         clientSecret:
 *           type: string
 *           description: The client secret required for completing the payment on the frontend
 *           example: "pi_1GqU5o2eZvKYlo2CzRAbHlZg_secret_6P9kxJxv32fZz"
 * 
 * /create_payment_intent:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Create a payment intent for processing payments
 *     description: Creates a Stripe payment intent to initiate a payment. The client secret is returned to be used on the frontend for completing the payment.
 *     responses:
 *       200:
 *         description: Successfully created payment intent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentIntent'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message when something goes wrong
 *                   example: "An error occurred while creating the payment intent."
 */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

module.exports.createPayment = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10 * 100, // Amount is in cents
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
