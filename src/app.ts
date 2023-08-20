import express from "express"
import { config } from 'dotenv';

import productRouter from "./routers/products"
import errorHandler from "./middleware/errorHandler";
import connectDb from "./config/db";

// To load .env
config()
// To load specific .env.{environment}
config({ path: `.env.${process.env.NODE_ENV}` });

connectDb()

const app = express()
// To parse json from client
app.use(express.json())
app.use("/api/products", productRouter)

app.get("/", (req, res) => {
    res.send("Hello NutraCount :)")
})

app.use(errorHandler);

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))