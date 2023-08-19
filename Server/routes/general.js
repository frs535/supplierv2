import express from "express";
import {
    getUser,
    getDashboardStats,
    getProfile,
    postProfile,
    getPartners,
    getPartner,
    postPartner,
    // getCompanies,
    // postCompanies,
    getSettings,
    postSettings
} from "../controllers/general.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/user/:id",verifyToken, getUser);

router.get("/partners", verifyToken, getPartners);
router.get("/partners/:id", verifyToken, getPartner);
router.post("/partners", verifyToken, postPartner);

router.get("/settings", verifyToken, getSettings);
router.post("/settings", verifyToken, postSettings);

router.get("/dashboard",verifyToken, getDashboardStats);

router.get("/profile/:id",verifyToken, getProfile);
router.post("/profile", verifyToken, postProfile);

export default router;