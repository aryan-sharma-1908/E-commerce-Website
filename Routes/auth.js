import { Router } from "express";
import registerUser from "../controllers/register.controller";
import loginUser from "../controllers/login.controller";

Router.post('/api/v1/auth/register',registerUser);
Router.post('/api/v1/auth/login',loginUser);

export default Router;