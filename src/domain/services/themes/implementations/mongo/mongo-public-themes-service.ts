import { IThemesService } from '@/domain/services/themes/themes-service.interface';
import {
    ThemeChildren,
    ThemeTests,
    ThemeQuestions,
    ThemeBreadcrumb, ThemeWith,
} from '../../themes.types';
import { Model } from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { ThemeType } from '@/domain/services/theme/theme.types';
import { IConverter } from '@/domain/service.types';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import { QuestionType } from '@/domain/services/question/question.types';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { TestType } from '@/domain/services/test/test.types';
import {
    ThemeChildrenConverterType,
} from '@/domain/converters/mongo/mongo-themes-children.converter';


export class MongoPublicThemesService implements IThemesService {
    constructor (
        private readonly _mongoThemeRepository: Model<ThemeModel>,
        private readonly _questionToPublicConverter: IConverter<QuestionDocument, QuestionType>,
        private readonly _testToPublicConverter: IConverter<TestDocument, TestType>,
        private readonly _themeToPublicConverter: IConverter<ThemeDocument, ThemeType>,
        private readonly _themeChildrenToPublicConverter: IConverter<ThemeChildrenConverterType, ThemeWith<[ ThemeChildren ]>[]>,
    ) {
    }

    async getThemeFullDataByPublicId (publicId: string): Promise<ThemeChildren & ThemeTests & ThemeQuestions & ThemeBreadcrumb & ThemeType> {
        const doc: ThemeDocument            = await this._mongoThemeRepository.findOne({ publicId }, {}, {
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
        const childrenDocs: ThemeDocument[] = await this._mongoThemeRepository.find({
            publicId: {
                $regex: new RegExp(`^${publicId}.+`),
            },
        });
        const ids: string[]                 = publicId.split('-');
        const parentIds: string[]           = ids
            .splice(1, ids.length - 1)
            .reduce((acc, id) => {
                acc.push(`${ acc[acc.length - 1] }-${ id }`);
                return acc;
            }, [ ids[0] ]);
        const breadcrumbs: ThemeDocument[]  = await this._mongoThemeRepository.find({
            publicId: {
                $in: parentIds.slice(0, parentIds.length - 1),
            },
        });
        /**
         * TODO: Заменить ан конвертеры
         */
        return {
            ...this._themeToPublicConverter.to(doc),
            questions : doc.questions
                .filter((question) => question.question)
                .map((questionDoc) => this._questionToPublicConverter.to(questionDoc.question)),
            tests     : doc.tests
                .map((testDoc) => this._testToPublicConverter.to(testDoc)),
            breadcrumb: breadcrumbs.map((breadcrumb) => ({
                publicId: breadcrumb.publicId,
                title   : breadcrumb.title,
                url     : breadcrumb.url,
            })),
            children  : this._themeChildrenToPublicConverter.to({
                children: childrenDocs, currentId: doc.publicId,
            }),
        };
    }

    getThemeWithChildren (publicId: string): Promise<ThemeChildren & ThemeBreadcrumb & ThemeType> {
        throw new Error('Method not implemented.');
    }

}