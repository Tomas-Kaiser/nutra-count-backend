import { Router } from "express"
import { createUser } from "../controllers/user"

const router = Router()

router.post("/", createUser)
// router.put("/:id", updateUser)
// router.delete("/:id", deleteUser)

export default router;