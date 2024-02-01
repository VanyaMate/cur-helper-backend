import { IThemesService } from '@/domain/services/themes/themes-service.interface';
import {
    ThemeChildren,
    ThemeTests,
    ThemeQuestions,
    ThemeBreadcrumb,
} from '../../themes.types';
import { Model } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { ThemeType } from '@/domain/services/theme/theme.types';


export class MongoPublicThemesService implements IThemesService {
    constructor (
        private readonly _mongoThemeRepository: Model<ThemeModel>,
    ) {
    }

    async getThemeFullDataByPublicId (publicId: string): Promise<ThemeChildren & ThemeTests & ThemeQuestions & ThemeBreadcrumb & ThemeType> {
        const doc: ThemeDocument = await this._mongoThemeRepository.findOne({ publicId }, {}, {
            populate: [
                {
                    path   : 'tests',
                    options: {
                        limit: 3,
                    },
                },
                {
                    path    : 'questions',
                    options : {
                        limit: 3,
                    },
                    populate: {
                        path: 'question',
                    },
                },
            ],
        });
        /**
         * TODO: Заменить ан конвертеры
         */
        return {
            id         : doc._id.toString(),
            publicId   : doc.publicId,
            title      : doc.title,
            description: doc.description,
            additional : doc.additional,
            body       : doc.body,
            url        : doc.url,
            questions  : doc.questions
                .filter((question) => question.question)
                .map((questionDoc) => ({
                    id         : questionDoc.question._id.toString(),
                    title      : questionDoc.question.title,
                    description: questionDoc.question.description,
                    body       : questionDoc.question.body,
                    answers    : [],
                    enabled    : questionDoc.question.enabled,
                    complexity : questionDoc.question.complexity,
                    points     : questionDoc.question.points,
                })),
            enabled    : doc.enabled,
            tests      : doc.tests
                .map((testDoc) => ({
                    id                 : testDoc._id.toString(),
                    title              : testDoc.title,
                    description        : testDoc.description,
                    enabled            : testDoc.enabled,
                    unsatisfactoryScore: testDoc.unsatisfactoryScore,
                    satisfactoryScore  : testDoc.satisfactoryScore,
                    perfectScore       : testDoc.perfectScore,
                    questionsAmount    : testDoc.questionsAmount,
                    timeToPass         : testDoc.timeToPass,
                    themeId            : testDoc.themeId.toString(),
                })),
            breadcrumb : [],
            children   : [],
        };
    }

    getThemeWithChildren (publicId: string): Promise<ThemeChildren & ThemeBreadcrumb & ThemeType> {
        throw new Error('Method not implemented.');
    }

}