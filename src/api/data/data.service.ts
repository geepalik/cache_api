import { CacheRepository } from "../../services/CacheRepository";
import { GetCacheItemDto } from "../../services/CacheRepository/dto/get-cache-item-dto";
import { SetCacheItemDto } from "../../services/CacheRepository/dto/set-cache-item-dto";
import { CustomErrors } from "../../util/CustomErrors";

export class DataService{
    cache: CacheRepository;

    constructor(){
        this.cache = new CacheRepository();
    }

    async get(key: string){
        const cacheItem: GetCacheItemDto | null = await this.cache.get(key);
        if(!cacheItem){
            throw new CustomErrors('The requested key was not found', `Key ${key} was not found in the current cache`, 404);
        }
        return cacheItem;
    }

    async set(setCacheItemDto: SetCacheItemDto){
        await this.cache.set(setCacheItemDto);
    }
}