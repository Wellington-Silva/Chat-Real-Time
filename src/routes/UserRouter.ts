import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/", UserController.register);
router.get("/", UserController.listAllUsers);
router.post("/user/signin", UserController.signin);

export default router;