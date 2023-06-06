import { Request, Response } from "express";
import { BaseController } from "../../base/base.controller";
import { DataService } from "./data.service";
import { SetCacheItemDto } from "../../services/CacheRepository/dto/set-cache-item-dto";
import { GetCacheRequest } from "./dto/request/get-cache-request-dto";

export class DataController extends BaseController{
    
    dataService: DataService;
    
    constructor(){
        super();
        this.dataService = new DataService();
    }

    async set(req: Request, res: Response){
        try{
            const {key, value, hours, minutes, seconds} = req.body;
            const setCacheItemDto: SetCacheItemDto = {
                key,
                value,
                ttl: {
                    hours,
                    minutes,
                    seconds
                }
            }
            await this.dataService.set(setCacheItemDto);
            this.jsonRes({}, res);
        }catch(e: any){
            this.errRes(e, res, e.message, e.statusCode);
        }
    }

    async get(req: GetCacheRequest, res: Response){
        try{
            const {key} = req.query;
            const doc = await this.dataService.get(key);
            this.jsonRes(doc, res);
        }catch(e: any){
            this.errRes(e, res, e.message, e.statusCode);
        }
    }
}