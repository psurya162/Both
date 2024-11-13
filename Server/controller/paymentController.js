const { createPaymentIntent } = require("../services/paymentService");
const db = require("../config/db_Setting");
const { calculateExpiryDate } = require("../utils/subscriptionUtils");

const CreatePayment = async (req, res) => {
  const { userId, planType } = req.body;

  console.log('Backend Received:', { userId, planType });

  const prices = {
      year: 4000,
      threeMonths: 1200,
      week: 100,
      day: 20,
  };

  if (!prices[planType]) {
      console.error('Invalid planType received:', planType); // Debugging
      return res.status(400).json({ error: 'Invalid plan type' });
  }

  try {
    const clientSecret = await createPaymentIntent(userId, planType, prices);

      const transactionResult = await db.queryAll(`
          INSERT INTO tbl_transactions (user_id, plan_type, amount, status, created_at)
          VALUES ('${userId}', '${planType}', ${prices[planType]}, 'initiated', NOW())
      `, true);

      if (!transactionResult) {
          throw new Error('Failed to insert transaction record');
      }

      res.status(200).json({ clientSecret, transactionId: transactionResult.insertId });
  } catch (error) {
      console.error('Error in CreatePayment:', error.message);
      res.status(500).json({ error: error.message });
  }
};


const HandleSubscription = async (req, res) => {
  const { userId, planType } = req.body;
  const durations = {
    year: 365,
    threeMonths: 90,
    week: 7,
    day: 1,
  };

  if (!durations[planType]) {
    return res.status(400).json({ error: "Invalid plan type" });
  }

  const durationInDays = durations[planType];
  try {
    const expiryDate = calculateExpiryDate(durationInDays);
    const startDate = new Date().toISOString().split("T")[0];
    const result = await db.queryAll(
      `
          UPDATE tblusers 
          SET issubscribed = '1', 
              subscriptionStartDate = '${
                new Date().toISOString().split("T")[0]
              }', 
              subscriptionExpiryDate = '${
                expiryDate.toISOString().split("T")[0]
              }'
          WHERE id = '${userId}'
      `,
      true
    );

    if (!result) {
      throw new Error("Failed to update user subscription status");
    }

    await db.queryAll(
      `
          UPDATE tbl_transactions 
          SET status = 'success', 
              expiry_date = '${expiryDate.toISOString().split("T")[0]}'
          WHERE user_id = '${userId}' 
            AND plan_type = '${planType}' 
            AND status = 'initiated'
      `,
      true
    );

    res.status(200).json({
      message: "Subscription updated successfully",
      subscriptionStartDate: startDate,
      subscriptionExpiryDate: expiryDate.toISOString().split("T")[0],
    })
  } catch (error) {
    console.error("Error in HandleSubscription:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { CreatePayment, HandleSubscription };
