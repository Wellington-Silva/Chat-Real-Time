"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IoController_1 = __importDefault(require("../controllers/IoController"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router.post('/send', (0, asyncHandler_1.default)((req, res) => IoController_1.default.sendMessage(req, res)));
router.get('/history', (0, asyncHandler_1.default)((req, res) => IoController_1.default.getMessageHistory(req, res)));
exports.default = router;
//# sourceMappingURL=ChatRouter.js.map