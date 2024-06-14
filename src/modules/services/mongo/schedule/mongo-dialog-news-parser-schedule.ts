import {
    INewsParserService,
} from '@/domain/services/news-parser/news-parser-service.interface';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsModel } from '@/db/mongoose/news/news.model';
import {
    MongoDialogNewsParserService,
} from '@/domain/services/news-parser/implementations/mongo-dialog/mongo-dialog-news-parser.service';
import { Cron, CronExpression } from '@nestjs/schedule';


export class MongoDialogNewsParserSchedule {
    private readonly _parser: INewsParserService;
    private readonly _logger = new Logger(MongoDialogNewsParserSchedule.name);

    constructor (
        @InjectModel('NewsModel') private readonly _newsModel: Model<NewsModel>,
    ) {
        this._parser = new MongoDialogNewsParserService(this._newsModel);
        this.parse();
    }

    @Cron(CronExpression.EVERY_HOUR)
    parse () {
        this._logger.log('Parse news started...');
        this._parser.parse(1)
            .then(() => this._logger.debug('All news parsed'))
            .catch((error) => this._logger.error('News parsed reject. ', error));
    }
}