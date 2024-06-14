export interface INewsParserService {
    parse (page: number): Promise<void>;
}