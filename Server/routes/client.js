import express from "express";
import {
    getProducts,
    getProduct,
    patchProduct,
    patchCatalog,
    getCatalogs,
    getPrice,
    postPrice,
    getOrder,
    getOrders,
    postOrder,
    getStock,
    postStock,
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

router.get("/order/:id", verifyToken, getOrder);
router.get("/orders", verifyToken, getOrders);
router.post("/orders", verifyToken, postOrder);
export  default router;