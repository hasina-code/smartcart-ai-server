import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getMyProducts,
  getProductById,
  getRelatedProducts,
  updateProduct,
} from "../controllers/product.controller";

import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router();


// ==========================
// Protected Routes
// ==========================

// Create Product
router.post(
  "/",
  authMiddleware,
  createProduct
);


// Get Logged in User Products
router.get(
  "/my-products",
  authMiddleware,
  getMyProducts
);


// Update Product
router.put(
  "/:id",
  authMiddleware,
  updateProduct
);


// Delete Product
router.delete(
  "/:id",
  authMiddleware,
  deleteProduct
);


// ==========================
// Public Routes
// ==========================


// Featured Products
router.get(
  "/featured",
  getFeaturedProducts
);


// All Products

router.get(
  "/",
  getAllProducts
);


// Related Products
router.get(
  "/:id/related",
  getRelatedProducts
);


// Single Product
router.get(
  "/:id",
  getProductById
);


export default router;