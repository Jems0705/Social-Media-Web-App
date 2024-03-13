import express from "express";
import { authLogin, authSignUp } from "../controllers/authController";

const router = express.Router();

router.post("/sign-in", authLogin);
router.post("/sign-up", authSignUp);

export default router;
