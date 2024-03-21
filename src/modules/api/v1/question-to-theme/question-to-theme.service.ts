import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionModel } from '@/db/mongoose/question/question.model';
import {
    MongoQuestionToThemeService,
} from '@/domain/services/question-to-theme/implementations/mongo/mongo-question-to-theme-service';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import {
    QuestionToThemeModel,
} from '@/db/mongoose/question-to-theme/question-to-theme.model';
import {
    IQuestionToThemeService,
} from '@/domain/services/question-to-theme/question-to-theme-service.interface';
import { QuestionToThemeType } from '@vanyamate/cur-helper-types';


@Injectable()
export class QuestionToThemeService {
    private readonly _questionToThemeService: IQuestionToThemeService;

    constructor (
        @InjectModel('QuestionModel') private readonly _mongoQuestionRepository: Model<QuestionModel>,
        @InjectModel('ThemeModel') private readonly _mongoThemeRepository: Model<ThemeModel>,
        @InjectModel('QuestionToThemeModel') private readonly _mongoQuestionToThemeRepository: Model<QuestionToThemeModel>,
    ) {
        this._questionToThemeService = new MongoQuestionToThemeService(
            this._mongoQuestionRepository,
            this._mongoThemeRepository,
            this._mongoQuestionToThemeRepository,
        );
    }

    async add (data: QuestionToThemeType) {
        try {
            return await this._questionToThemeService.addQuestionToTheme(data);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async remove (data: QuestionToThemeType) {
        try {
            return await this._questionToThemeService.removeQuestionFromTheme(data);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async addByPublicId (data: QuestionToThemeType) {
        try {
            return await this._questionToThemeService.addQuestionToThemeByPublicId(data);
        } catch (e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}