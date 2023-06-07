import moment from 'moment';
import { CacheItem } from './dto/cache-item-dto';
import { SetCacheItemDto } from './dto/set-cache-item-dto';
import { GetCacheItemDto } from './dto/get-cache-item-dto';
import { Ttl } from './dto/ttl-dto';

export class CacheRepository{

    private repository: Map<string, CacheItem>;

    constructor(){
        this.repository = new Map<string, CacheItem>();
    }

    set(setCacheItemDto: SetCacheItemDto): void{
        const {key, value, ttl} = setCacheItemDto;
        const currentTime = moment().format();
        const cacheItem: CacheItem = {
            value,
            expiresOn: this.calculateExpireTime(currentTime, ttl)
        }
        this.repository.set(key, cacheItem);
    }

    get(key: string): GetCacheItemDto | null{
        //check if key exists
        //if yes, check with method if key expired
        //if yes, delete from repostiry, return null
        //if not, get ttl in seconds and return
        const cacheItem: CacheItem | undefined = this.repository.get(key);
        if(!cacheItem){
            return null;
        }
        const {expiresOn} = cacheItem;
        const isExpired = this.isKeyExpired(expiresOn);
        if(isExpired){
            this.delete(key);
            return null;
        }
        //if not, update ttl with new time and return
        const remainingTime = this.calculateKeyRemainingTtl(expiresOn);
        const getCacheItem: GetCacheItemDto = {
            key,
            value: cacheItem.value,
            ttl_seconds: remainingTime
        }
        return getCacheItem;
    }

    private calculateExpireTime(createdTime: string, ttl: Ttl): string{
        const {hours, minutes, seconds} = ttl;
        const createdTimeWithTtl = moment(createdTime).add(hours, 'hours').add(minutes, 'minutes').add(seconds, 'seconds');
        return createdTimeWithTtl.format();
    }

    private calculateKeyRemainingTtl(expiresOn: string): number{
        const currentTime = moment();
        const expiresTime = moment(expiresOn);
        const duration = moment.duration(expiresTime.diff(currentTime));
        return Math.floor(duration.asSeconds());

    }

    private isKeyExpired(expireTime: string): boolean{
        const currentTime = moment();
        const expireTimeFormatted = moment(expireTime);
        return currentTime.isAfter(expireTimeFormatted);

    }

    private delete(key: string): void{
        this.repository.delete(key);
    }
}