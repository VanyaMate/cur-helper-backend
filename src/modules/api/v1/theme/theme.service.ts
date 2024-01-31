import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ThemeCreateType, ThemeUpdateType } from '@/domain/theme/theme.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import { IThemeService } from '@/domain/theme/theme-service.interface';
import {
    MongoThemeService,
} from '@/domain/theme/implementations/mongoose/mongo-theme-service';
import {
    DtoValidatorService,
} from '@/modules/services/dto-validator/dto-validator.service';
import { ThemeCreateDto } from '@/domain/theme/dto/theme-create.dto';
import { ThemeUpdateDto } from '@/domain/theme/dto/theme-update.dto';
import {
    MongoThemeConverter,
} from '@/domain/theme/implementations/mongoose/mongo-theme.converter';


@Injectable()
export class ThemeService {
    private readonly _themeService: IThemeService;

    constructor (
        @InjectModel('ThemeModel') private readonly _themeModel: Model<ThemeModel>,
        private readonly _dtoValidator: DtoValidatorService,
    ) {
        this._themeService = new MongoThemeService(this._themeModel, new MongoThemeConverter());
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