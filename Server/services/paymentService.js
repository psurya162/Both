const stripe = require('stripe')('sk_test_51Pq7HR06cVP5WkZIMRx6GkLSHfwrRLQccJbETsDM6UQjkij9wSmZIg8mFKwqeCPn2JfiiANL5WA6I8Rxrjw3QlBq00NHf2Flae'); // Use environment variable for real key

const createPaymentIntent = async (userId, planType, prices) => {
  const amount = prices[planType];

  if (!amount) {
    throw new Error("Invalid plan type");
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "inr",
    metadata: { userId, planType },
  });

  return paymentIntent.client_secret;
};

module.exports = { createPaymentIntent };