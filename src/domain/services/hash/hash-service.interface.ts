export interface IHashService {
    hash (payload: string): Promise<string>;

    validate (token: string, hash: string): Promise<boolean>;
}