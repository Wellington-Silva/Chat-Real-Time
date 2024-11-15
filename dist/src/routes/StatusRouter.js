"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = __importDefault(require("../middlewares/jwt"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const StatusController_1 = __importDefault(require("../controllers/StatusController"));
const router = (0, express_1.Router)();
router.get('/', jwt_1.default, (0, asyncHandler_1.default)((req, res) => StatusController_1.default.getUserStatus(req, res)));
exports.default = router;
//# sourceMappingURL=StatusRouter.js.map