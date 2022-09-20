import {Router} from "express";
import { signIn } from "../controllers/userControllers";
import schemaValidator from "../middlewares/schemaMiddlewares";
import { passwordValidator, searchUser } from "../middlewares/userMiddleware";
import { conectUserSchema } from "../schemas/userSchemas";

const signInRouter = Router();

signInRouter.post("/sign-in", schemaValidator(conectUserSchema) , searchUser, passwordValidator , signIn );

export default signInRouter;