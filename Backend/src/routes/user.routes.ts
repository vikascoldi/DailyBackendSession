import express, { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
const router = express.Router();
// api/auth  
router.post("/register",registerUser);
router.post("/login",loginUser);


export default router;