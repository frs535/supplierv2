import express from "express";
import {getProducts, getCustomers, getTransactions, patchProduct, patchCatalog, getCatalogs} from "../controllers/client.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/products",verifyToken, getProducts);
router.patch("/products", verifyToken, patchProduct)

router.get("/catalog",verifyToken, getCatalogs);
router.patch("/catalog", verifyToken, patchCatalog)

router.get("/customers",verifyToken, getCustomers);
router.get("/transactions",verifyToken, getTransactions);
export  default router;