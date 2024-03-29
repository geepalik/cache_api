import express, {Request, Response, Router} from "express";
import { getKeyValidator, setKeyValidator } from "./data.middleware";
import runValidation from "../../middleware/validators";
import { DataController } from "./data.controller";
import { GetCacheRequest } from "./dto/request/get-cache-request-dto";

const dataRouter: Router = express.Router();

const dataController = new DataController();

dataRouter.get('/data/get', getKeyValidator, runValidation, (req: GetCacheRequest, res: Response) => {dataController.get(req, res)});
dataRouter.post('/data/set', setKeyValidator, runValidation, (req: Request, res: Response) => {dataController.set(req, res)});

export default dataRouter;