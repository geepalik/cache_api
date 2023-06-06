interface CacheItem{
    value: string,
    createdOn: string,
    ttl: {hours: number, minutes: number, seconds: number}
}

export class CacheRepository{

    private repository: Map<string, CacheItem>;

    constructor(){
        this.repository = new Map<string, CacheItem>();
    }

    set(key: string, value: CacheItem): void{}

    get(key: string): void{}
}