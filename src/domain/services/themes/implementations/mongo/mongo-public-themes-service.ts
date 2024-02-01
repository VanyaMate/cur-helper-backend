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
        return doc as null;
    }

    getThemeWithChildren (publicId: string): Promise<ThemeChildren & ThemeBreadcrumb & ThemeType> {
        throw new Error('Method not implemented.');
    }

}