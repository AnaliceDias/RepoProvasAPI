import express , {json} from "express";
import cors from "cors";
import router from "../router";

const app = express()

app.use(json())
app.use(cors());
app.use(router);

export default app;