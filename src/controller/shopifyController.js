const ordersModel = require('../../Models/shopifyOrders');

exports.orderPost = async (req, res) => {
    try {
        const { id, customer, line_items, created_at, updated_at } = req.body;

        // Check if order already exists
        const existingOrder = await ordersModel.findOne({ orderId: id });
        if (existingOrder) {
            return res.status(200).send('Order already exists');
        }

        const order = new ordersModel({
            orderId: id,
            customer,
            items: line_items,
            status: 'created',
            createdAt: created_at,
            updatedAt: updated_at
        });

        await order.save();
        res.status(200).send('Order created webhook received');
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.orderUpdated = async (req, res) => {
    try {
        const { id, customer, line_items, updated_at } = req.body;

        await ordersModel.updateOne({ orderId: id }, {
            customer,
            items: line_items,
            status: 'updated',
            updatedAt: new Date(updated_at)
        });

        res.status(200).send('Order updated webhook received');
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.orderFullfilled = async (req, res) => {
    try {
        const { id, customer, line_items, updated_at } = req.body;

        await ordersModel.updateOne({ orderId: id }, {
            customer,
            items: line_items,
            status: 'fullfilled',
            updatedAt: new Date(updated_at)
        });

        res.status(200).send('Order updated webhook received');
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.orderDelete = async (req, res) => {
    try {
        const { id, customer, line_items, updated_at } = req.body;

        await ordersModel.updateOne({ orderId: id }, {
            customer,
            items: line_items,
            status: 'cancelled',
            updatedAt: new Date(updated_at)
        });

        res.status(200).send('Order updated webhook received');
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send('Internal Server Error');
    }
};
