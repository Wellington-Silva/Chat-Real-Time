"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: true, message: "Token não fornecido" });
        return;
    }
    ;
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: true, message: "Token malformado" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Adiciona os dados do usuário à requisição
        req.user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture,
            password: decoded.password
        };
        next();
    }
    catch (error) {
        res.status(401).json({ error: true, message: "Token inválido" });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=jwt.js.map