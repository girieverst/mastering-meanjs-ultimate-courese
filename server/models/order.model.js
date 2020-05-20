const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  deliveryDate: {
    type: Date,
    default: Date.now,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  itemList: [{ name: "string", price: "number", imgUrl: "string" }],
  cartId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  versionKey: false,
});

module.exports = mongoose.model("Order", UserSchema);
