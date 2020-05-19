const express = require("express");
const orderController = require("../controllers/order.controller");
const asyncHandler = require("express-async-handler");

const router = express.Router();

// localhost:4050/api/orders/submit
router.post("/submit", asyncHandler(submitOrder));

async function submitOrder(req, res, next) {
  const order = req.body;
  console.log(`Submiting  order`, order);
  const newOrder = await orderController.submitOrder(order);
  res.json({ order: newOrder });

  next();
}
module.exports = router;
