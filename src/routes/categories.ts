import {Router} from "express";
import { Request , Response } from "express";

const categoriesRouter = Router();

categoriesRouter.get("/categories", async (req: Request, res: Response) => res.send("All categories") );

export default categoriesRouter;