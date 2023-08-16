import express from "express"
import productRouter from "./routers/products"
const app = express()

// To parse json from client
app.use(express.json())
app.use("/products", productRouter)

app.get("/", (req, res) => {
    res.send("Hello NutraCount :)")
})

app.listen(8000, () => console.log("Server listening on port 8000..."))