import { NewsDocument } from '@/db/mongoose/news/news.model';
import {
    DomainNews,
    DomainNewsFull,
} from '@vanyamate/cur-helper-types/types/news/DomainNews';


export const mongoNewsToDomainFull = function (news: NewsDocument): DomainNewsFull {
    return {
        key        : news.key,
        date       : news.date,
        preview    : news.preview,
        description: news.description,
        title      : news.title,
        body       : news.body,
    };
};