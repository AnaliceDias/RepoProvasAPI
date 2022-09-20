import {Router} from "express";
import { createUser } from "../controllers/userControllers";
import schemaValidator from "../middlewares/schemaMiddlewares";
import { createUserSchema } from "../schemas/userSchemas";


const signUpRouter = Router();

signUpRouter.post("/sign-up" , schemaValidator(createUserSchema) , createUser)


export default signUpRouter;