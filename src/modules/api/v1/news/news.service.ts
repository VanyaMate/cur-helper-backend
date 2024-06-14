import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsModel } from '@/db/mongoose/news/news.model';
import { INewsService } from '@/domain/services/news/news-service.interface';
import {
    MongoNewsService,
} from '@/domain/services/news/implementations/mongo-news.service';
import { Options } from '@vanyamate/cur-helper-types';
import {
    DomainNews,
} from '@vanyamate/cur-helper-types/types/news/DomainNews';


@Injectable()
export class NewsService {
    private readonly _service: INewsService;

    constructor (
        @InjectModel('NewsModel') private readonly _newsModel: Model<NewsModel>,
    ) {
        this._service = new MongoNewsService(this._newsModel);
    }

    async get (key: string) {
        return await this._service.get(key);
    }

    async getMany (searchOptions: Options<DomainNews>) {
        return await this._service.getMany(searchOptions);
    }
}