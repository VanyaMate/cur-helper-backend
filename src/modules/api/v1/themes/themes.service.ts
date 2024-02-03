import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import { IThemesService } from '@/domain/services/themes/themes-service.interface';
import {
    MongoPublicThemesService,
} from '@/domain/services/themes/implementations/mongo/mongo-public-themes-service';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';


@Injectable()
export class ThemesService {
    private readonly _themesService: IThemesService;

    constructor (
        @InjectModel('ThemeModel') private readonly _mongoThemeRepository: Model<ThemeModel>,
        private readonly _mongoConverter: MongoConverterService,
    ) {
        this._themesService = new MongoPublicThemesService(
            this._mongoThemeRepository,
            this._mongoConverter.question,
            this._mongoConverter.test,
            this._mongoConverter.theme,
            this._mongoConverter.themesChildren,
        );
    }

    async getFullDataByPublicId (publicId: string) {
        return this._themesService.getThemeFullDataByPublicId(publicId);
    }
}