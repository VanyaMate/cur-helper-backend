import { Injectable } from '@nestjs/common';
import { Theme, ThemeSchema } from './theme.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateThemeDto } from './dto/create-theme.dto';


@Injectable()
export class ThemeService {
    constructor (
        @InjectModel(Theme.name) private readonly _themeModel: Model<Theme>,
    ) {
    }

    create (createDto: CreateThemeDto) {
        return this._themeModel.create(createDto);
    }

    getAll () {
        return this._themeModel
            .find()
            .populate('parent')
            .populate('children')
            .exec();
    }
}