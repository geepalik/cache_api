import { DataService } from "../../src/api/data/data.service"
import { SetCacheItemDto } from "../../src/services/CacheRepository/dto/set-cache-item-dto";
import { TestUtils } from "../TestUtils";

describe('Cache tests', () => {
    let dataService: DataService;

    beforeAll(()=>{
        dataService = new DataService();
    })

    it('should be defined', () => {
        expect(dataService).toBeDefined();
    })

    it('write and get data from cache', async ()=>{
        const key = "newKey";
        const value = "ABC";
        const ttlSeconds = 30;
        const cacheItem: SetCacheItemDto = {
            key,
            value,
            ttl: {
                hours: 0,
                minutes: 0,
                seconds: ttlSeconds
            }
        }
        await dataService.set(cacheItem);
        
        const keyData = await dataService.get(key);
        expect(keyData.key).toBe(key);
        expect(keyData.value).toBe(value);
        expect(keyData.ttl_seconds).toBeLessThan(ttlSeconds);
    })

    it('write and check that key is expired after ttl passes', async ()=>{
        const key = "newKey";
        const value = "ABC";
        const cacheItem: SetCacheItemDto = {
            key,
            value,
            ttl: {
                hours: 0,
                minutes: 0,
                seconds: 3
            }
        }
        await dataService.set(cacheItem);

        await TestUtils.timeOut(4000);

        let response;
        try{
            const keyData = await dataService.get(key);            
        }catch(error: any){
            response = error;
        }        
        expect(response.message).toBe('The requested key was not found');
    })
})