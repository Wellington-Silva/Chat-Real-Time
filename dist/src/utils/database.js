"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const pool = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Arvoredeip@1',
    database: 'chat',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = pool;
//# sourceMappingURL=database.js.map