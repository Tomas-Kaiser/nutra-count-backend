import { Router } from "express"
import { createUser, updateUser } from "../controllers/user"
import { auth } from "../middleware/auth"

const router = Router()

router.post("/", createUser)
router.put("/:id", auth, updateUser)
// router.delete("/:id", deleteUser)

export default router;