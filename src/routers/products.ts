import { Router } from "express"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, } from "../controllers/product"
import { auth } from "../middleware/auth"

const router = Router()

router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/", auth, createProduct)
router.put("/:id", auth, updateProduct)
router.delete("/:id", auth, deleteProduct)

export default router;