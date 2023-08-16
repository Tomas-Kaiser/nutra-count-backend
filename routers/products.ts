import { Router } from "express"
import CreateProductDto from "../dtos/Product"

const router = Router()

router.get("/", (req, res) => {
    res.send("List of products")
})

router.post("/", (req, res) => {
    const { name } = req.body as CreateProductDto
    res.json(name)
})

export default router;