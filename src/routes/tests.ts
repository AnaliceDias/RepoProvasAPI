import {Router} from "express";
import { createTest, getTests } from "../controllers/testControllers";
import { authValidator } from "../middlewares/authMiddlewares";
import schemaValidator from "../middlewares/schemaMiddlewares";
import { postTestSchema } from "../schemas/testSchemas";

const testsRouter = Router();

testsRouter.get("/tests",  authValidator , getTests);
testsRouter.post("/tests" , schemaValidator(postTestSchema), authValidator , createTest);

export default testsRouter;