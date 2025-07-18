import { Router } from "express";
import registerUser from "../controllers/register.controller.js";
import loginUser from "../controllers/login.controller.js";
import logOutUser from "../controllers/logout.controller.js"

const router = Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logOutUser);

export default router;