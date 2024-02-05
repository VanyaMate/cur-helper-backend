export interface IHashService {
    hash (payload: string): Promise<string>;
}