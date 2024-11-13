import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: true, message: "Token não fornecido" });
        return;
    };

    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: true, message: "Token malformado" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

        // Adiciona os dados do usuário à requisição
        (req as any).user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture,
            password: decoded.password
        };

        next();
    } catch (error) {
        res.status(401).json({ error: true, message: "Token inválido" });
    }
};

export default authMiddleware;
