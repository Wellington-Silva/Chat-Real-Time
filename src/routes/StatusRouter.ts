import { Router, Request, Response } from 'express';
import authMiddleware from "../middlewares/jwt";
import asyncHandler from '../middlewares/asyncHandler';
import StatusController from '../controllers/StatusController';

const router = Router();

router.get('/', authMiddleware, asyncHandler((req: Request, res: Response) => StatusController.getUserStatus(req, res)));

export default router;
