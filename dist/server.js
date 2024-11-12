"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const UserRouter_1 = __importDefault(require("./src/routes/UserRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
data_source_1.AppDataSource.initialize()
    .then(() => {
    // Routes
    app.use("/users", UserRouter_1.default);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
})
    .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));
//# sourceMappingURL=server.js.map