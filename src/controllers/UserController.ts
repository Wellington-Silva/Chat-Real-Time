import { Request, Response } from "express";
import UserService from "../services/UserService";

interface IUser {
    name: string,
    email: string,
    password: string,
    picture: string,
};

interface IAuth {
    email: string,
    password: string
};

class UserController {

    async listAllUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: true, message: "Erro ao buscar usuários" });
        }
    };

    async showUser(req: Request, res: Response) {

        const id = Number(req.query.id);

        try {
            const user = await UserService.getUserById(id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: true, message: "Erro ao buscar usuário" });
        }
    };

    async register(req: Request, res: Response) {
        const { name, email, password, picture } = req?.body as IUser;
        try {
            const userCreated = await UserService.create(name, picture, email, password);
            res.status(201).json(userCreated);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: true, message: "Erro ao cadastrar usuário" })
        }
    };

    async signin(req: Request, res: Response) {
        const { email, password } = req?.body as IAuth;

        const userToken = await UserService.signin(email, password);

        res.json({ message: "Login bem-sucedido", userToken });
    };
};

export default new UserController();