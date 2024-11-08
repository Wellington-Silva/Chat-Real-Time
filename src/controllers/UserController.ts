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
        try {
            const { name, email, password, picture } = req?.body as IUser;
            const register = await UserService.create(name, picture, email, password);
            if (!register) return res.status(400).json({ error: true, message: "Erro ao cadastrar usuário" });
            res.json(register);
        } catch (error) {
            res.status(500).json({ error: true, message: "Erro ao cadastrar usuário" })        
        }
    };

    async signin(req: Request, res: Response) {

    };
}

export default new UserController();