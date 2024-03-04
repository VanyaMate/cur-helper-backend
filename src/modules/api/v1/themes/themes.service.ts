import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import { IThemesService } from '@/domain/services/themes/themes-service.interface';
import {
    MongoPublicThemesService,
} from '@/domain/services/themes/implementations/mongo/mongo-public-themes-service';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import { TestPassingModel } from '@/db/mongoose/test-passing/test-passing.model';


@Injectable()
export class ThemesService {
    private readonly _themesService: IThemesService;

    constructor (
        @InjectModel('ThemeModel') private readonly _mongoThemeRepository: Model<ThemeModel>,
        @InjectModel('TestPassingModel') private readonly _testPassingModel: Model<TestPassingModel>,
        private readonly _mongoConverter: MongoConverterService,
    ) {
        this._themesService = new MongoPublicThemesService(
            this._mongoThemeRepository,
            this._testPassingModel,
            this._mongoConverter.themeFull,
            this._mongoConverter.themeChildren,
            this._mongoConverter.themeRecursive,
        );
    }

    async getFullDataByPublicId (publicId: string, userId?: string) {
        try {
            return await this._themesService.getThemeFullDataByPublicId(publicId, userId);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async getListById (publicId: string) {
        try {
            return await this._themesService.getThemeListById(publicId);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async getList () {
        try {
            return await this._themesService.getThemesList();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}