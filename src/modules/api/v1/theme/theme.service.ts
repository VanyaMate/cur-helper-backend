import { Injectable } from '@nestjs/common';
import { Theme, ThemeDocument } from './theme.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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
        const list: string[] = id.split('-');
        const themesGroup    = await this._themeModel.aggregate<{
            _id: null,
            themes: ThemeDocument[]
        }>([
            { $match: { id: { $in: list } } },
            {
                $group: {
                    _id   : null,
                    themes: { $push: '$$ROOT' }, // Собираем все найденные темы в массив
                },
            },
        ]);
        const themes         = themesGroup[0].themes;
        let generalTheme     = themes.find((theme) => (theme.id === list[0]) && (theme.parentId === null));
        let currentTheme     = generalTheme;

        if (!generalTheme) {
            return null;
        }

        for (let i = 1; i < list.length; i++) {
            const id    = list[i];
            const theme = themes.find((theme) => {
                return theme.id === id && theme.parentId?.toString() === currentTheme._id.toString();
            });
            if (theme) {
                currentTheme.children = [ theme ];
                currentTheme          = theme;
                continue;
            }
            return null;
        }

        return generalTheme;
    }
}