import { Request, Response } from "express";
declare class UserController {
    listAllUsers(req: Request, res: Response): Promise<void>;
    showUser(req: Request, res: Response): Promise<void>;
    register(req: Request, res: Response): Promise<void>;
    signin(req: Request, res: Response): Promise<void>;
}
declare const _default: UserController;
export default _default;
