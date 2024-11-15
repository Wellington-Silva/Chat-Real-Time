import { User } from '../entity/User';
import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';

class StatusController {

    async getUserStatus(req: Request, res: Response) {
        try {
            const users = await AppDataSource.getRepository(User).find({
                select: ['id', 'name', 'isOnline'],
            });
            res.json(users);
        } catch (error) {
            console.error("Erro ao obter o status dos usuários:", error);
            return res.status(500).json({ message: "Erro ao obter o status dos usuários" });
        }
    };

};

export default new StatusController();