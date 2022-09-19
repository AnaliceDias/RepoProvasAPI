import {Router} from "express";
import { createUser } from "../controllers/userControllers";


const signUpRouter = Router();

signUpRouter.post("/sign-up" , createUser)


export default signUpRouter;