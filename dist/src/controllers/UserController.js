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
class UserController {
    listAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserService_1.default.getAll();
            res.json(users);
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, picture } = req === null || req === void 0 ? void 0 : req.body;
            try {
                console.log(req.body);
                const userCreated = yield UserService_1.default.create(name, picture, email, password);
                res.status(201).json(userCreated);
            }
            catch (error) {
                res.status(500).json({ error: true, message: "Erro ao cadastrar usuário" });
            }
        });
    }
    ;
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map