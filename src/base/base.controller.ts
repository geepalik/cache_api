import { Response } from "express";

export class BaseController{
    jsonRes(doc: any, res: Response){
        res.status(200).json(doc);
    }

    errRes(err: any, res: Response, message = "Server Error", status = 500){
        if(process.env.NODE_ENV === "development"){
            res.status(status).json({error: message, details: err.originalMessage});
        }else{
            res.status(status).json({error: message});
        }
    }
}