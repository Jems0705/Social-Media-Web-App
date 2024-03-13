import express from "express";
import { authLogin } from "../controllers/authController";

const router = express.Router();

router.post("/sign-in", authLogin);

export default router;
