import  {Order} from '../models/order.model.js';
import {Product} from '../models/product.model.js';

// Place a new order
export const placeOrder = async (req, res) => {
  // const {orderDetails} = req.body;
  const { products, shippingAddress, guestUserInfo, guestUUID,note } = req.body; // Include guest user info

  console.log(guestUserInfo);

  let totalAmount = 0;

  // Calculate total price and check stock
  for (const item of products) {
    console.log('item',item)
    const product = await Product.findById(item?.product);
    if (!product || product.stock < item.quantity) {
      return res.status(400).json({ message: `Product ${product ? product.name : item.name} out of stock` });
    }
    totalAmount += product.price * item.quantity;
    console.log('ttl pp',totalAmount);
  }
  console.log('ttl pp',totalAmount);

  // Create a new order with user or guest information
  const newOrder = new Order({
    user:null,
    // Set user if logged in
    guestUUID: guestUUID || null, // Set guest UUID if provided
    guestUserInfo: guestUserInfo || null, // Set guest user info if provided
    products,
    totalAmount,
    paymentMethod:'cod',
    shippingAddress,
    note
  });

  try {
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
};


// Get all orders for a guest user
export const getGuestOrders = async (req, res) => {
  const { id } = req.params; // Expect guestUUID in the query parameters
  const guestUUID = id;

  if (!guestUUID) {
    return res.status(400).json({ message: 'Guest UUID is required' });
  }

  try {
    const orders = await Order.find({ guestUUID }).populate('products.product').sort({'placedAt':-1});
    
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this guest' });
    }
    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guest orders', error });
  }
};


// Get a single order for a guest user
export const getGuestOrderById = async (req, res) => {
  const { guestUUID, orderId } = req.query; // Expect guestUUID and orderId in the query parameters

  if (!guestUUID || !orderId) {
    return res.status(400).json({ message: 'Guest UUID and Order ID are required' });
  }

  try {
    const order = await Order.findOne({ _id: orderId, guestUUID }).populate('products.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found for this guest' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the guest order', error });
  }
};




// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user products.product').sort({"placedAt":-1});
    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Get order details by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: 'Order not found', error });
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
  const { orderStatus } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(req.params?.id, { orderStatus }, { new: true });
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};


// Delete order by ID (Admin only)
export const deleteOrderById = async (req, res) => {
  const { id } = req.params; // Extract order ID from request parameters

  try {
    const order = await Order.findById(id);

    // Check if order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Optionally, update stock quantities back if the order is canceled
    for (const item of order.products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity } // Increase product stock by order quantity
      });
    }

    // Delete the order
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};
