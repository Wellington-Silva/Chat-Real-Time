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
Object.defineProperty(exports, "__esModule", { value: true });
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
    create(name, picture, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.createUser({ name, picture, email, password });
            if (user)
                return user;
            return { error: true, message: "Erro ao cadastrar usuário" };
        });
    }
    ;
}
;
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map