export interface IJwtService {
    encode (payload: any): Promise<string>;

    decode<T> (token: string): Promise<T>;
}