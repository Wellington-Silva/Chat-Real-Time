import { Router, Request, Response } from 'express';
import IoController from '../controllers/IoController';
import asyncHandler from '../middlewares/asyncHandler';

const router = Router();

router.post('/send', asyncHandler((req: Request, res: Response) => IoController.sendMessage(req, res)));

router.get('/history', asyncHandler((req: Request, res: Response) => IoController.getMessageHistory(req, res)));

export default router;
