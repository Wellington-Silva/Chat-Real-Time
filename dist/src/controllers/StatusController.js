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
const User_1 = require("../entity/User");
const data_source_1 = require("../../data-source");
class StatusController {
    getUserStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield data_source_1.AppDataSource.getRepository(User_1.User).find({
                    select: ['id', 'name', 'isOnline'],
                });
                res.json(users);
            }
            catch (error) {
                console.error("Erro ao obter o status dos usuários:", error);
                return res.status(500).json({ message: "Erro ao obter o status dos usuários" });
            }
        });
    }
    ;
}
;
exports.default = new StatusController();
//# sourceMappingURL=StatusController.js.map