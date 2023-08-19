import express, { Request, Response, NextFunction, ErrorRequestHandler, Handler } from "express"
// import dotenv from 'dotenv/config'
// import 'dotenv/config'
import { config } from 'dotenv';

import productRouter from "./routers/products"
import errorHandler from "./middleware/errorHandler";

// To load .env
config()
// To load specific .env.{environment}
config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT || 5001
const app = express()


// To parse json from client
app.use(express.json())
app.use("/api/products", productRouter)

app.get("/", (req, res) => {
    res.send("Hello NutraCount :)")
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))