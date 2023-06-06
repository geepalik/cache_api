import { Request } from "express"

export interface GetCacheRequest extends Request {
    query: {
        key: string
    }
}