const Order = require("../models/order.model");
const User = require("../models/user.model");

const { sendEmail } = require("../services/email-sender.service");

async function submitOrder(order) {
  // make a mogoose db call to save order in db
  console.log(`Creating Order`, order);

  const createdOrder = await new Order(order).save();

  const user = await User.findById(createdOrder.userId);

  sendEmail(createdOrder, user);

  console.log(`Order created successfully for user ${user.id}`, createdOrder);

  return createdOrder;
}

async function getOrderById(orderId) {
  console.log(`Searching order for order`, orderId);

  return await Order.findById(orderId);
}

async function getOrderByUserId(userId) {
  console.log(`Searching order for user`, userId);

  return await Order.find({
    userId,
  });
}

async function getAllOrders() {
  console.log(`Fetching all orders`);

  return await Order.find({});
}

module.exports = {
  submitOrder,
  getOrderById,
  getAllOrders,
  getOrderByUserId,
};
