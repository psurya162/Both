// routes/paymentRoutes.js

const express = require("express");
const {
  CreatePayment,
  HandleSubscription,
} = require("../controller/paymentController");
const paymentroute = express.Router();

paymentroute.post("/create-payment", CreatePayment);
paymentroute.post("/handle-subscription", HandleSubscription);

module.exports = paymentroute;
