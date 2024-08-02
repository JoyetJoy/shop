const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: String,
    customer: Object,
    items: Array,
    status: String,
    createdAt: Date,
    updatedAt: Date
  });
const signupModel = mongoose.model('shopifyOrder', orderSchema);
module.exports = signupModel;
