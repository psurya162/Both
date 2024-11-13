// src/cron/subscriptionCron.js
const cron = require("node-cron");
const db = require("../config/db_Setting");

cron.schedule('0 0 * * *', async () => {
  console.log("Running daily subscription check");
  const today = new Date().toISOString().split('T')[0];

  const expiredSubscriptions = await db.queryAll(`
    SELECT id FROM tblusers 
    WHERE issubscribed = 1 AND subscriptionExpiryDate < '${today}'`,
    true
  );

  if (expiredSubscriptions.length > 0) {
    await db.queryAll(`
      UPDATE tblusers 
      SET issubscribed = 0 
      WHERE id IN (${expiredSubscriptions.map(user => `'${user.id}'`).join(',')})`,
      true
    );

    console.log("Updated subscription status for expired subscriptions");
  }
});
