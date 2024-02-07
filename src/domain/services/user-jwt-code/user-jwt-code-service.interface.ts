export interface IUserJwtCodeService {
    createFor (userId: string): Promise<string>;

    updateFor (userId: string): Promise<string>;

    readForUser (userId: string): Promise<string>;

    deleteForUser (userId: string): Promise<boolean>;
}