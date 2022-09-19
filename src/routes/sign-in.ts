import {Router} from "express";
import { signIn } from "../controllers/userControllers";

const signInRouter = Router();

signInRouter.post("/sign-in", signIn );

export default signInRouter;