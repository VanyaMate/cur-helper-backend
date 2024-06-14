import {
    DomainNews,
    DomainNewsFull,
} from '@vanyamate/cur-helper-types/types/news/DomainNews';
import { Options } from '@vanyamate/cur-helper-types';


export interface INewsService {
    get (key: string): Promise<DomainNewsFull>;

    getMany (searchOptions: Options<DomainNewsFull>): Promise<DomainNews[]>;
}