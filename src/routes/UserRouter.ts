import { Router } from "express";
import authMiddleware from "../middlewares/jwt";
import UserController from "../controllers/UserController";

const router = Router();

// Auth
router.post("/signin", UserController.signin);

// User
router.post("/", UserController.register);
router.get("/", authMiddleware, UserController.listAllUsers);
router.get("/show", authMiddleware, UserController.showUser);

export default router;