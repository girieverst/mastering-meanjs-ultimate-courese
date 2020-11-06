const Order = require("../models/order.model");

async function submitOrder(order) {
  console.log("saving order object to database", order);

  return await new Order(order).save();
}

async function getOrderById(orderId) {
  console.log(`Searching order for`, orderId);

  return await Order.findById(orderId);
}

async function getAllOrders() {
  console.log(`Fetching all orders`);

  return await Order.find({});
}

async function getOrdersByUserId(userId) {
  console.log(`Searching orders for user`, userId);

  return await Order.find({
    userId,
  });
}

module.exports = {
  submitOrder,
  getOrderById,
  getAllOrders,
  getOrdersByUserId,
};
