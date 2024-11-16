import express from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all products with optional filters (open to all users)
router.get("/", getAllProducts);

// Get a single product by ID (open to all users)
router.get("/:id", getProductById);

// Add a new product (Admin only)
router.post("/", protect, adminOnly, addProduct);

// Update a product (Admin only)
router.put("/:id", protect, adminOnly, updateProduct);

// Delete a product (Admin only)
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
