import {
    Theme,
    ThemeBody,
    ThemeChildren,
    ThemeParent,
    ThemeTests,
    ThemeWith,
} from '@/domain/theme/theme.types';
import { IThemesService } from '@/domain/themes/themes-service.interface';
import { Model } from 'mongoose';
import {
    Theme as MongoTheme,
    ThemeDocument,
} from '@/domain/theme/implementations/mongo/mongo-theme.model';
import { Test as MongoTest } from '@/domain/test/implementations/mongo/mongo-test.model';
import { IConverter } from '@/domain/service.types';


export class MongoThemesService implements IThemesService {
    constructor (
        private readonly _themeModel: Model<MongoTheme>,
        private readonly _testModel: Model<MongoTest>,
        private readonly _mongoModelConverter: IConverter<ThemeDocument, Theme>,
    ) {
    }

    async getByIds (id: string): Promise<(ThemeParent & Theme) | null> {
        const ids: string[]           = this._splitId(id);
        const themes: ThemeDocument[] = await this._themeModel.find({
            $or: [
                { id: { $in: ids } },
                { id: { $regex: `^${ ids[ids.length - 1] }` } },
            ],
        });

        return this._makeThemeTree(id, themes.map(this._mongoModelConverter.to));
    }

    getByIdsWithAll (id: string): Promise<ThemeParent & ThemeChildren & ThemeTests & ThemeBody & Theme> {
        throw new Error('Method not implemented.');
    }

    getByIdsWithBody (id: string): Promise<ThemeParent & ThemeBody & Theme> {
        throw new Error('Method not implemented.');
    }

    getByIdsWithTests (id: string): Promise<ThemeParent & ThemeTests & Theme> {
        throw new Error('Method not implemented.');
    }

    getByIdsWithChildren (id: string): Promise<ThemeParent & ThemeChildren & Theme> {
        throw new Error('Method not implemented.');
    }

    private _splitId (id: string): string[] {
        const ids               = id.split('-');
        let previousId: string  = ids[0];
        const idsList: string[] = [ previousId ];
        for (let i = 1; i < ids.length; i++) {
            previousId = [ previousId, ids[i] ].join('-');
            idsList.push(previousId);
        }
        return idsList;
    }

    /**
     *
     * 1. Сделать дерево из тем
     * 2. Дополнить их темами
     * 3. Дополнить их childrens
     *
     * @param id
     * @param themes
     * @param theme
     * @param parent
     * @private
     */
    private _makeThemeTree (id: string, themes: Theme[], theme: ThemeWith<[ ThemeParent ]> = null, parent: ThemeWith<[ ThemeParent ]> = null): ThemeWith<[ ThemeParent ]> {
        if (!theme) {
            const start: ThemeWith<[ ThemeParent ]> = {
                ...themes.find((theme) => theme.id === id),
                parent: null,
            };
            return this._makeThemeTree(id, themes, start, start);
        }
        const parentId: string | null = id.match(/(.+)-\d+$/)?.[1];
        if (parentId) {
            theme.parent = {
                ...themes.find((theme) => theme.id === parentId),
                parent: null,
            };
            return this._makeThemeTree(parentId, themes, theme.parent, parent);
        } else {
            return parent;
        }
    }
}