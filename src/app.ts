import express from "express"
import { config } from 'dotenv';
import 'express-async-errors';

import productsRouter from "./routers/products"
import usersRouter from "./routers/users"
import authRouter from "./routers/auth"
import errorHandler from "./middleware/errorHandler";
import connectDb from "./config/db";

// To load .env
config()
if (!process.env.NODE_ENV || !process.env.JWT_PRIVATE_KEY_NUTRA_CHECK_BACKEND) {
    console.error("FATAL ERROR: node_env or jwt_private_key have not been set up");
    process.exit(1);
}
// To load specific .env.{environment}
config({ path: `.env.${process.env.NODE_ENV}` });

connectDb()

const app = express()
// To parse json from client
app.use(express.json())
app.use("/api/products", productsRouter)
app.use("/api/users", usersRouter)
app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
    res.send("Hello NutraCount :)")
})

app.use(errorHandler);

const PORT = process.env.PORT || 5001
export const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))