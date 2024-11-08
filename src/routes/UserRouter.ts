import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/user", UserController.register);
router.post("/user/signin", UserController.signin);

export default router;