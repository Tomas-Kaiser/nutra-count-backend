import { Router } from "express"
import { authUser } from "../controllers/auth";

const router = Router()
router.post("/", authUser)

export default router;