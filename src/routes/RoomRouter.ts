import { Router, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import RoomController from "../controllers/RoomController";

const router = Router();

router.post("/", asyncHandler((req: Request, res: Response) => RoomController.createRoom(req, res)));
router.get("/", asyncHandler((req: Request, res: Response) => RoomController.listRooms(req, res)));
router.post("/sendMessage", asyncHandler((req: Request, res: Response) => RoomController.sendMessageToRoom(req, res)));

export default router;
