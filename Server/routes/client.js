import express from "express";
import {getProducts, getCustomers, getTransactions} from "../controllers/client.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/products",verifyToken, getProducts);
router.get("/customers",verifyToken, getCustomers);
router.get("/transactions",verifyToken, getTransactions);
export  default router;