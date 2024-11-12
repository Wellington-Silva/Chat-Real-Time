// src/data-source.ts
import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./src/entity/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "chat",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});
