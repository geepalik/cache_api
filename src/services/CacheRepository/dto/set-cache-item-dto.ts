import { Ttl } from "./ttl-dto";

export interface SetCacheItemDto{
    key: string,
    value: string,
    ttl: Ttl
}