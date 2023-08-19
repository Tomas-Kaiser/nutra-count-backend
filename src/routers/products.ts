import { Router } from "express"

import { createProduct, getProduct, updateProduct } from "../controllers/product"

const router = Router()

router.get("/", getProduct)

router.post("/", createProduct)

router.put("/:id", updateProduct)

router.delete("/:id", updateProduct)

export default router;