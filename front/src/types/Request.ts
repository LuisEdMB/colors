import { Method } from "axios";

export interface Request {
    url: string,
    method: Method,
    data: any
}