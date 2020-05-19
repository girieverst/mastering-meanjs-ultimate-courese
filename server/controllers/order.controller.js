const Order = require("../models/order.model");

async function submitOrder(order) {
  // make a mogoose db call to save order in db
  console.log(`saving order to db`, order);

  return await new Order(order).save();
}

module.exports = {
  submitOrder,
};
