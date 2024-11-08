import express from "express";
import UserRouter from "./src/routes/UserRouter";

const app = express();
app.use(express.json());

app.use(UserRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));