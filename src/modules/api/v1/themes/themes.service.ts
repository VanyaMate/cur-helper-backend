import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import { IThemesService } from '@/domain/services/themes/themes-service.interface';
import {
    MongoPublicThemesService,
} from '@/domain/services/themes/implementations/mongo/mongo-public-themes-service';
import {
    MongoQuestionConverter,
} from '@/domain/converters/mongo/mongo-question.converter';
import {
    MongoQuestionAnswerConverter,
} from '@/domain/converters/mongo/mongo-question-answer.converter';
import { MongoTestConverter } from '@/domain/converters/mongo/mongo-test.converter';
import { MongoThemeConverter } from '@/domain/converters/mongo/mongo-theme.converter';
import {
    MongoThemesChildrenConverter,
} from '@/domain/converters/mongo/mongo-themes-children.converter';


@Injectable()
export class ThemesService {
    private readonly _themesService: IThemesService;

    constructor (
        @InjectModel('ThemeModel') private readonly _mongoThemeRepository: Model<ThemeModel>,
    ) {
        this._themesService = new MongoPublicThemesService(
            this._mongoThemeRepository,
            new MongoQuestionConverter(new MongoQuestionAnswerConverter()),
            new MongoTestConverter(),
            new MongoThemeConverter(),
            new MongoThemesChildrenConverter(new MongoThemeConverter()),
        );
    }

    async getFullDataByPublicId (publicId: string) {
        return this._themesService.getThemeFullDataByPublicId(publicId);
    }
}