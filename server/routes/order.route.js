const express = require("express");
const passport = require("../middleware/passport");
const orderController = require("../controllers/order.controller");
const asyncHandler = require("express-async-handler");

const router = express.Router();

// localhost:4050/api/orders/submit
router.post(
  "/submit",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(submitOrder)
);

// localhost:4050/api/orders/1235
router.get(
  "/:orderId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(getOrderById)
);

// localhost:4050/api/orders
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(getAllOrders)
);

async function submitOrder(req, res, next) {
  const orderToSave = req.body;
  console.log(`Creating order`, orderToSave);
  const order = await orderController.submitOrder(orderToSave);
  res.json(order);

  next();
}

async function getOrderById(req, res, next) {
  const order = await orderController.getOrderById(req.params.orderId);
  res.json(order);

  next();
}

async function getAllOrders(req, res, next) {
  const orders = await orderController.getAllOrders();
  res.json(orders);

  next();
}

module.exports = router;
