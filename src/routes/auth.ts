import { Router } from "express"
import { validateToken } from "../libs/verifyToken"
import { signin, signup, profile} from "../controller/auth.controller"

const router: Router = Router();

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/profile", validateToken, profile)

export default router;