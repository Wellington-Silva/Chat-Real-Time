import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import UserRouter from "./src/routes/UserRouter";

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {

        // Routes
        app.use("/users", UserRouter);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
    })
    .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));