"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
;
;
class UserController {
    listAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.user;
            try {
                const users = yield UserService_1.default.getAll();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ error: true, message: "Erro ao buscar usuários" });
            }
        });
    }
    ;
    showUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.query.id);
            try {
                const user = yield UserService_1.default.getUserById(id);
                res.json(user);
            }
            catch (error) {
                res.status(500).json({ error: true, message: "Erro ao buscar usuário" });
            }
        });
    }
    ;
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, picture } = req === null || req === void 0 ? void 0 : req.body;
            try {
                const userCreated = yield UserService_1.default.create(name, picture, email, password);
                res.status(201).json(userCreated);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: true, message: "Erro ao cadastrar usuário" });
            }
        });
    }
    ;
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req === null || req === void 0 ? void 0 : req.body;
            const userToken = yield UserService_1.default.signin(email, password);
            res.json({ message: "Login bem-sucedido", userToken });
        });
    }
    ;
}
;
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map