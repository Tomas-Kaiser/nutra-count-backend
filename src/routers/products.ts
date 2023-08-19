import { Router } from "express"

import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product"

const router = Router()

router.get("/", getProduct)

router.post("/", createProduct)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct)

export default router;