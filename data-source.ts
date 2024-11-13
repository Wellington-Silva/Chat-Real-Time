// src/data-source.ts
import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./src/entity/User";
import { Message } from "./src/entity/Message";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "chat",
    synchronize: true,
    logging: false,
    entities: [User, Message], // Inclua a entidade Message
    migrations: [],
    subscribers: [],
});
