"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = __importDefault(require("../middlewares/jwt"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = (0, express_1.Router)();
// Auth
router.post("/signin", UserController_1.default.signin);
// User
router.post("/", UserController_1.default.register);
router.get("/", jwt_1.default, UserController_1.default.listAllUsers);
router.get("/show", jwt_1.default, UserController_1.default.showUser);
exports.default = router;
//# sourceMappingURL=UserRouter.js.map