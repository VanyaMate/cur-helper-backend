import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import {
    IAdminThemesService,
} from '@/domain/services/admin/themes/admin-themes-service.interface';
import {
    MongoAdminThemesService,
} from '@/domain/services/admin/themes/implementations/mongo/mongo-admin-themes.service';
import { InjectModel } from '@nestjs/mongoose';
import {
    AdminThemeShortType,
    AdminThemeType, Filter,
    Options,
} from '@vanyamate/cur-helper-types';
import { QuestionModel } from '@/db/mongoose/question/question.model';
import {
    QuestionToThemeModel,
} from '@/db/mongoose/question-to-theme/question-to-theme.model';


@Injectable()
export class AdminThemesService {
    private readonly _adminThemesService: IAdminThemesService;

    constructor (
        @InjectModel('ThemeModel') private readonly _themeRepository: Model<ThemeModel>,
        @InjectModel('QuestionToThemeModel') private readonly _questionRepository: Model<QuestionToThemeModel>,
        private readonly _converter: MongoConverterService,
    ) {
        this._adminThemesService = new MongoAdminThemesService(
            this._themeRepository,
            this._questionRepository,
            this._converter.theme,
            this._converter.adminTestShort,
            this._converter.adminQuestionShort,
            this._converter.filter,
            this._converter.adminThemeShort,
        );
    }

    public getList (filter: Filter<AdminThemeShortType>, options: Options<AdminThemeShortType>) {
        return this._adminThemesService.getList(filter, options);
    }

    public getOneById (id: string): Promise<AdminThemeType> {
        return this._adminThemesService.getOneTheme(id);
    }

    public getUnlinkedForQuestion (questionId: string) {
        return this._adminThemesService.findManyUnlinkedForQuestion(questionId, {}, {});
    }
}