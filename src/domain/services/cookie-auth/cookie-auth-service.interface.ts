import { Response, Request } from 'express';


export interface ICookieAuthService {
    set (response: Response, data: string): void;

    remove (response: Response): void;

    get (request: Request): string;
}