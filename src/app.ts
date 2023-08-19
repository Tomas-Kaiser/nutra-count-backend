import express from "express"
// import dotenv from 'dotenv/config'
// import 'dotenv/config'
import { config } from 'dotenv';

import productRouter from "./routers/products"

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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))