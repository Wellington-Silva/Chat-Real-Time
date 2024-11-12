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
exports.UserRepository = void 0;
const data_source_1 = require("../../data-source");
const User_1 = require("../entity/User");
class UserRepository {
    constructor() {
        this.userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userRepo.create(userData);
            return yield this.userRepo.save(user);
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.find();
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map