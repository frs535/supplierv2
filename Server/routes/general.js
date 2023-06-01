import express from "express";
import { getUser, getDashboardStats } from "../controllers/general.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/user/:id",verifyToken, getUser);
router.get("/dashboard",verifyToken, getDashboardStats);

export default router;