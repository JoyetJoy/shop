const orderModel = require('../../Models/shopifyOrders');

exports.orderGet = async (req, res) => {
  try {
    console.log('Fetching orders...'); // Log when the request is received
    const orders = await orderModel.find();
    console.log('Orders fetched successfully:', orders); // Log successful fetch
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error); // Log errors
    res.status(500).json({ message: error.message });
  }
};
