// src/routes/ChatRouter.ts
import { Router, Request, Response } from 'express';
import IoController from '../controllers/IoController';
import asyncHandler from '../middlewares/asyncHandler';

const chatRouter = Router();

// Definindo os tipos de `req` e `res` nos manipuladores de rota
chatRouter.post('/send', asyncHandler((req: Request, res: Response) => IoController.sendMessage(req, res)));

chatRouter.get('/history', asyncHandler((req: Request, res: Response) => IoController.getMessageHistory(req, res)));

export default chatRouter;
