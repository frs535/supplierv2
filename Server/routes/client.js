import express from "express";
import {
    getProducts,
    getProduct,
    getCustomers,
    getTransactions,
    patchProduct,
    patchCatalog,
    getCatalogs,
    getPrice,
    postPrice,
    getOrders,
    postOrder,
    getStock,
    postStock
} from "../controllers/client.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/product",verifyToken, getProduct);

router.get("/products",verifyToken, getProducts);
router.patch("/products", verifyToken, patchProduct);

router.get("/catalog",verifyToken, getCatalogs);
router.patch("/catalog", verifyToken, patchCatalog);

router.get("/price/:id/:companyId", verifyToken, getPrice);
router.post("/price", verifyToken, postPrice);

router.get("/stock", verifyToken, getStock);
router.post("/stock", verifyToken, postStock);

router.get("/orders", verifyToken, getOrders);
router.post("/orders", verifyToken, postOrder);

router.get("/customers",verifyToken, getCustomers);
router.get("/transactions",verifyToken, getTransactions);
export  default router;