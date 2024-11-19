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
require("dotenv/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entity/User");
const data_source_1 = require("../../data-source");
const UserRepository_1 = require("../repository/UserRepository");
const userRepository = new UserRepository_1.UserRepository();
class UserService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userRepository.findAllUsers();
            if (users)
                return users;
            return { error: true, message: "Nenhum usuário encontrado" };
        });
    }
    ;
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findById(id);
            if (user)
                return user;
            return { error: true, message: "Usuário não encontrado" };
        });
    }
    ;
    create(name, picture, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = yield userRepository.createUser({ name, picture, email, password: hashedPassword });
            const userJWT = {
                id: user.id,
                name: user.name,
                picture: user.picture,
                email: user.email,
                password: user.password
            };
            if (user) {
                const token = jsonwebtoken_1.default.sign(userJWT, process.env.JWT_SECRET);
                // Atualizar o status do usuário para online após a criação
                yield data_source_1.AppDataSource.getRepository(User_1.User).update(user.id, { isOnline: true });
                return { user, token };
            }
            ;
            return { error: true, message: "Erro ao cadastrar usuário" };
        });
    }
    ;
    signin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findByEmail(email);
            if (!user)
                return { error: true, message: "Usuário não encontrado" };
            // Compare password with hash armazened
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid)
                return { error: true, message: "Senha incorreta" };
            const userJWT = {
                id: user.id,
                name: user.name,
                picture: user.picture,
                email: user.email,
                password: user.password
            };
            const token = jsonwebtoken_1.default.sign(userJWT, process.env.JWT_SECRET);
            // Atualizar o status para online
            yield data_source_1.AppDataSource.getRepository(User_1.User).update(user.id, { isOnline: true });
            return { token, user: { id: user.id, name: user.name, email: user.email, picture: user.picture } };
        });
    }
    ;
}
;
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map