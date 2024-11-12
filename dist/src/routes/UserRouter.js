"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = (0, express_1.Router)();
router.post("/", UserController_1.default.register);
router.get("/", UserController_1.default.listAllUsers);
router.get("/show", UserController_1.default.showUser);
router.post("/signin", UserController_1.default.signin);
exports.default = router;
//# sourceMappingURL=UserRouter.js.map