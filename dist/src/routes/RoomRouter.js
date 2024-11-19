"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const RoomController_1 = __importDefault(require("../controllers/RoomController"));
const router = (0, express_1.Router)();
router.post("/", (0, asyncHandler_1.default)((req, res) => RoomController_1.default.createRoom(req, res)));
router.get("/", (0, asyncHandler_1.default)((req, res) => RoomController_1.default.listRooms(req, res)));
exports.default = router;
//# sourceMappingURL=RoomRouter.js.map