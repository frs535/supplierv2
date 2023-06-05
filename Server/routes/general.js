import express from "express";
import {getUser, getDashboardStats, getProfile, postProfile} from "../controllers/general.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/user/:id",verifyToken, getUser);
router.get("/dashboard",verifyToken, getDashboardStats);

router.get("/profile/:id",verifyToken, getProfile);
router.post("/profile", verifyToken, postProfile);

export default router;