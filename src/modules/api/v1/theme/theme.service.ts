import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IThemeService } from '@/domain/services/theme/theme-service.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import {
    DtoValidatorService
} from '@/modules/services/dto-validator/dto-validator.service';
import {
    MongoFilterConverterService
} from '@/modules/services/mongo/mongo-filter-converter.service';
import {
    MongoThemeService
} from '@/domain/services/theme/implementations/mongoose/mongo-theme-service';
import {
    MongoThemeConverter
} from '@/domain/services/theme/implementations/mongoose/mongo-theme.converter';
import { ThemeCreateType, ThemeUpdateType } from '@/domain/services/theme/theme.types';
import { ThemeCreateDto } from '@/domain/services/theme/dto/theme-create.dto';
import { ThemeUpdateDto } from '@/domain/services/theme/dto/theme-update.dto';


@Injectable()
export class ThemeService {
    private readonly _themeService: IThemeService;

    constructor (
        @InjectModel('ThemeModel') private readonly _themeModel: Model<ThemeModel>,
        private readonly _dtoValidator: DtoValidatorService,
        private readonly _mongoFilterConverter: MongoFilterConverterService,
    ) {
        this._themeService = new MongoThemeService(
            this._themeModel,
            new MongoThemeConverter(),
            this._mongoFilterConverter,
        );
    }

    async createTheme (createData: ThemeCreateType) {
        try {
            await this._dtoValidator.validate(new ThemeCreateDto(createData));
            return await this._themeService.create(createData);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async getById (id: string) {
        try {
            return await this._themeService.read({ id: { type: 'equal', value: id } });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async updateById (id: string, updateData: ThemeUpdateType) {
        try {
            await this._dtoValidator.validate(new ThemeUpdateDto(updateData));
            return await this._themeService.update(id, updateData);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteById (id: string) {
        try {
            return await this._themeService.delete(id);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}