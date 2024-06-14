import { INewsService } from '@/domain/services/news/news-service.interface';
import { Options } from '@vanyamate/cur-helper-types';
import {
    DomainNewsFull,
    DomainNews,
} from '@vanyamate/cur-helper-types/types/news/DomainNews';
import { Model } from 'mongoose';
import { NewsModel } from '@/db/mongoose/news/news.model';
import {
    mongoNewsToDomain,
} from '@/domain/services/news/converters/mongoNewsToDomain';
import {
    mongoNewsToDomainFull,
} from '@/domain/services/news/converters/mongoNewsToDomainFull';


export class MongoNewsService implements INewsService {
    constructor (private readonly _model: Model<NewsModel>) {
    }

    async get (key: string): Promise<DomainNewsFull> {
        const news = await this._model.findOne({ key });
        if (news) {
            return mongoNewsToDomainFull(news);
        } else {
            return null;
        }
    }

    async getMany (searchOptions: Options<DomainNewsFull>): Promise<DomainNews[]> {
        const news = await this._model.find({}, {}, {
            limit    : searchOptions.limit ?? 20,
            sort     : searchOptions.sort ? {
                [searchOptions.sort[0]]: searchOptions.sort[1] === 'asc' ? 1
                                                                         : -1,
            } : {
                date: -1,
            },
            skip     : searchOptions.offset ?? 0,
            collation: {
                locale         : 'en',
                numericOrdering: true,
            },
        });

        return news.map(mongoNewsToDomain);
    }
}