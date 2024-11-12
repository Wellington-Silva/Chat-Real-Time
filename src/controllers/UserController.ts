import { Request, Response } from "express";
import UserService from "../services/UserService";

interface IUser {
    name: string,
    email: string,
    password: string,
    picture: string,
};

class UserController {

    async register(req: Request, res: Response) {
        const { name, email, password, picture } = req?.body as IUser;
        try {
            const register = await UserService.create(name, picture, email, password);
            res.json(register);
        } catch (error) {
            res.status(500).json({ error: true, message: "Erro ao cadastrar usuário" })        
        }
    };

    async signin(req: Request, res: Response) {

    };
}

export default new UserController();