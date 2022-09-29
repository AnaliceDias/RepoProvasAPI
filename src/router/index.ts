import { Router } from "express";
import signInRouter from "../routes/sign-in";
import signUpRouter from "../routes/sign-up";
import testsRouter from "../routes/tests";

const router = Router();

router.use(signUpRouter);
router.use(signInRouter);
router.use(testsRouter);

export default router;