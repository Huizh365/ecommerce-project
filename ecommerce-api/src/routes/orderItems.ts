import express from "express";
import {
  updateOrderItem,
  deleteOrderItem, 
  getOrderItemsByPaymentId} from "../controllers/orderItemController"; 
const router = express.Router();


router.patch("/:id", updateOrderItem)
router.delete("/:id", deleteOrderItem)
router.get("/:payment_id", getOrderItemsByPaymentId)

export default router