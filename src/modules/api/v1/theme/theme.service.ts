import { Injectable } from '@nestjs/common';
import {
    Theme,
    ThemeDocument,
} from '../../../../domain/theme/implementations/mongo/mongo-theme.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateThemeDto } from './dto/create-theme.dto';
import { IThemeService } from '@/domain/theme/theme-service.interface';
import { IThemesService } from '@/domain/themes/themes-service.interface';
import {
    MongoThemeConverter,
} from '@/domain/theme/implementations/mongo/mongo-theme.converter';
import {
    MongoThemeService,
} from '@/domain/theme/implementations/mongo/mongo-theme.service';
import { DtoValidator } from '@/domain/dto.validator';
import {
    MongoThemesService,
} from '@/domain/themes/implementations/mongo/mongo-themes.service';
import { Test } from '@/domain/test/implementations/mongo/mongo-test.model';


@Injectable()
export class ThemeService {
    private _themeService: IThemeService;
    private _themesService: IThemesService;

    constructor (
        @InjectModel(Theme.name) private readonly _themeModel: Model<Theme>,
        @InjectModel(Test.name) private readonly _testModel: Model<Test>,
    ) {
        const converter     = new MongoThemeConverter();
        const dtoValidator  = new DtoValidator();
        this._themeService  = new MongoThemeService(this._themeModel, converter, dtoValidator);
        this._themesService = new MongoThemesService(
            this._themeModel,
            this._testModel,
            converter,
        );
    }

    create (createDto: CreateThemeDto) {
        return this._themeModel.create(createDto);
    }

    async getAllService () {
    }

    async getAll () {
        const themes: ThemeDocument[] = await this._themeModel
            .find({ parentId: null })
            .populate({
                path    : 'children',
                populate: {
                    path    : 'children',
                    populate: {
                        path: 'children',
                    },
                },
            })
            .exec();

        return themes;
    }

    async getById (id: string) {
        return this._themesService.getByIds(id);
    }
}