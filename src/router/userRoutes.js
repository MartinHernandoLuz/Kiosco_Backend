import { Router } from "express";
import { createUser, loginUser } from "../controller/userController.js";
import { reqControl } from "../middleware/reqCorrecionUser.js";

const router = Router()


router.post("/create",reqControl,createUser)
router.post("/login",reqControl,loginUser)





export default router;