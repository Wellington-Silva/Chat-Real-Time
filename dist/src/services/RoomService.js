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
const Room_1 = require("../entity/Room");
const data_source_1 = require("../../data-source");
class RoomService {
    createRoom(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomRepository = data_source_1.AppDataSource.getRepository(Room_1.Room);
            const newRoom = roomRepository.create({ name });
            return yield roomRepository.save(newRoom);
        });
    }
    ;
    getRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield data_source_1.AppDataSource.getRepository(Room_1.Room).find();
        });
    }
    ;
}
;
exports.default = new RoomService();
//# sourceMappingURL=RoomService.js.map