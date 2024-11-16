import express from 'express';
import { placeOrder, getAllOrders, getOrderById, updateOrderStatus, getGuestOrderById, getGuestOrders, deleteOrderById } from '../controllers/order.controller.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Place a new order (for authenticated users)
router.post('/', placeOrder);

// Get all orders (Admin only)
router.get('/', protect, adminOnly, getAllOrders);

// Get order details by ID (for authenticated users/admin)
router.get('/:id', getOrderById);

router.delete('/:id',protect, adminOnly, deleteOrderById);

router.get('/guest-orders/:id', getGuestOrders);

// Update order status (Admin only)
router.put('/:id/change-status', protect, adminOnly, updateOrderStatus);

export default router;
