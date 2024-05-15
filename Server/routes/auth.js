import express from "express";
import {changeAPIKey, changePassword, getUsers, login, register} from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", verifyToken, register);
router.post("/changePassword", verifyToken, changePassword)
router.get("/changeAPIKey", verifyToken, changeAPIKey)

router.get("/:id", verifyToken, getUsers);

export default router;