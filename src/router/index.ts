import { Router } from "express";
import categoriesRouter from "../routes/categories";
import signInRouter from "../routes/sign-in";
import signUpRouter from "../routes/sign-up";
import testsRouter from "../routes/tests";

const router = Router();

router.use(signUpRouter);
router.use(signInRouter);
router.use(categoriesRouter);
router.use(testsRouter);

export default router;