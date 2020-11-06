const express = require("express");
const orderController = require("../controllers/order.controller");
const asyncHandler = require("express-async-handler");

const router = express.Router();

// http://localhost:4050/api/orders/submit
router.post("/submit", asyncHandler(submitOrder));

// http://localhost:4050/api/orders/5ecd57e5c1aa49646c9f70aa
router.get('/:orderId', asyncHandler(getOrderById));


async function submitOrder(req, res, next) {
  const orderToSave = req.body;
  console.log("Received order to save is", orderToSave);

  const order = await orderController.submitOrder(orderToSave);

  res.json(order);
}

async function getOrderById(req, res, next) {
  const order = await orderController.getOrderById(req.params.orderId);
  res.json(order);
}

module.exports = router;
