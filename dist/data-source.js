"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/data-source.ts
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./src/entity/User");
const Room_1 = require("./src/entity/Room");
const Message_1 = require("./src/entity/Message");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "chat",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Message_1.Message, Room_1.Room],
    migrations: [],
    subscribers: [],
    extra: {
        connectionLimit: 10,
    },
});
//# sourceMappingURL=data-source.js.map