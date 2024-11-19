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
const RoomService_1 = __importDefault(require("../services/RoomService"));
class RoomController {
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const room = yield RoomService_1.default.createRoom(name);
            return res.status(201).json(room);
        });
    }
    ;
    listRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield RoomService_1.default.getRooms();
            return res.status(200).json(rooms);
        });
    }
    ;
}
;
exports.default = new RoomController();
//# sourceMappingURL=RoomController.js.map