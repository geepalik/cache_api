import { Request, Response } from "express";
import { BaseController } from "../../base/base.controller";
import { DataService } from "./data.service";

export class DataController extends BaseController{
    
    dataService: DataService;
    
    constructor(){
        super();
        this.dataService = new DataService();
    }

    async set(req: Request, res: Response){
        try{

        }catch(e: any){
            this.errRes(e, res, e.message, e.statusCode);
        }
    }

    async get(req: Request, res: Response){
        try{
            const {key} = req.query;
        }catch(e: any){
            this.errRes(e, res, e.message, e.statusCode);
        }
    }
}