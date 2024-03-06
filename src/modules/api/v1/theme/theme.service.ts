import { Injectable } from '@nestjs/common';
import { IThemeService } from '@/domain/services/theme/theme-service.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import {
    DtoValidatorService,
} from '@/modules/services/dto-validator/dto-validator.service';
import {
    MongoThemeService,
} from '@/domain/services/theme/implementations/mongoose/mongo-theme-service';
import { ThemeCreateDto } from '@/domain/services/theme/dto/theme-create.dto';
import { ThemeUpdateDto } from '@/domain/services/theme/dto/theme-update.dto';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import { ThemeCreateType, ThemeUpdateType } from '@vanyamate/cur-helper-types';
import { ErrorCallerService } from '@/modules/services/error/error-caller.service';


@Injectable()
export class ThemeService {
    private readonly _themeService: IThemeService;

    constructor (
        @InjectModel('ThemeModel') private readonly _themeModel: Model<ThemeModel>,
        private readonly _errorCaller: ErrorCallerService,
        private readonly _dtoValidator: DtoValidatorService,
        private readonly _mongoConverter: MongoConverterService,
    ) {
        this._themeService = new MongoThemeService(
            this._errorCaller,
            this._themeModel,
            this._mongoConverter.theme,
            this._mongoConverter.filter,
        );
    }

    async createTheme (createData: ThemeCreateType) {
        await this._dtoValidator.validate(new ThemeCreateDto(createData));
        return await this._themeService.create(createData);
    }

    async getById (id: string) {
        return await this._themeService.read({ id: { type: 'equal', value: id } });
    }

    async updateById (id: string, updateData: ThemeUpdateType) {
        await this._dtoValidator.validate(new ThemeUpdateDto(updateData));
        return await this._themeService.update(id, updateData);
    }

    async deleteById (id: string) {
        return await this._themeService.delete(id);
    }
}