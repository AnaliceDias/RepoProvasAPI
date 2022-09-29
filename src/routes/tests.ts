import {Router} from "express";
import { createTest, getCategories, getTests } from "../controllers/testControllers";
import { authValidator } from "../middlewares/authMiddlewares";
import schemaValidator from "../middlewares/schemaMiddlewares";
import { postTestSchema } from "../schemas/testSchemas";
import { Request , Response } from "express";

const testsRouter = Router();

testsRouter.get("/tests",  authValidator , getTests);
testsRouter.post("/tests" , schemaValidator(postTestSchema), authValidator , createTest);
testsRouter.get("/tests/categories", authValidator , getCategories );

export default testsRouter;