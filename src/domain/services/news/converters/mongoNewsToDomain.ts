import { NewsDocument } from '@/db/mongoose/news/news.model';
import { DomainNews } from '@vanyamate/cur-helper-types/types/news/DomainNews';


export const mongoNewsToDomain = function (news: NewsDocument): DomainNews {
    return {
        key        : news.key,
        date       : news.date,
        preview    : news.preview,
        description: news.description,
        title      : news.title,
    };
};