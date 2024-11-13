const cron = require("node-cron");
const db = require("../config/db_Setting");

const calculateExpiryDate = (durationInDays) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + durationInDays);
  return expiryDate;
};

const updateSubscriptionStatus = async (userId, planType, durationInDays) => {
  const expiryDate = calculateExpiryDate(durationInDays);
  console.log("Updating subscription status for user:", userId);
  console.log("Calculated expiry date:", expiryDate);

  // Update the user's subscription status in the database
  const result = await db.queryAll(
    `UPDATE tblusers 
     SET issubscribed = 1, 
         subscriptionStartDate = '${new Date().toISOString().split('T')[0]}', 
         subscriptionExpiryDate = '${expiryDate.toISOString().split('T')[0]}' 
     WHERE id = '${userId}'`,
    true
  );

  if (!result) {
    throw new Error("Failed to update user subscription status");
  }

  return expiryDate;
};

// Schedule a job to check for expired subscriptions
cron.schedule('0 0 * * *', async () => { // Runs daily at midnight
  console.log("Running daily subscription check");
  const today = new Date().toISOString().split('T')[0];
  
  // Find all subscriptions that have expired
  const expiredSubscriptions = await db.queryAll(`
    SELECT id FROM tblusers 
    WHERE issubscribed = 1 AND subscriptionExpiryDate < '${today}'`,
    true
  );
  
  if (expiredSubscriptions.length > 0) {
    // Update the subscription status to inactive for expired subscriptions
    await db.queryAll(`
      UPDATE tblusers 
      SET issubscribed = 0 
      WHERE id IN (${expiredSubscriptions.map(user => `'${user.id}'`).join(',')})`,
      true
    );

    console.log("Updated subscription status for expired subscriptions");
  }
});

module.exports = { updateSubscriptionStatus, calculateExpiryDate };
