import express from "express";
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  updateStock} from "../controllers/productController.ts";
const router = express.Router();

router.get("/", getProducts)
router.get("/:id", getProductById)
router.post("/", createProduct)
router.patch("/:id", updateProduct)
router.delete("/:id", deleteProduct)
router.patch("/:id", updateStock)

export default router