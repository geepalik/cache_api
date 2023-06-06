import express, {Router} from "express";
import dataRouter from "../../api/data/data.routes";

const apiV1Router: Router = express.Router();
apiV1Router.use('/api/v1', dataRouter);

export default apiV1Router;