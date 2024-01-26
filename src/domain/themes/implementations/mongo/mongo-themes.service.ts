import {
    Theme,
    ThemeBody,
    ThemeChildren,
    ThemeParent, ThemeTestResult,
    ThemeTests,
    ThemeWith,
} from '@/domain/theme/theme.types';
import { IThemesService } from '@/domain/themes/themes-service.interface';
import { Model } from 'mongoose';
import {
    Theme as MongoTheme,
    ThemeDocument,
} from '@/domain/theme/implementations/mongo/mongo-theme.model';
import {
    Test as MongoTest,
    TestDocument,
} from '@/domain/test/implementations/mongo/mongo-test.model';
import { IConverter } from '@/domain/service.types';
import { Test, TestResults, TestWith } from '@/domain/test/test.types';


export class MongoThemesService implements IThemesService {
    constructor (
        private readonly _themeModel: Model<MongoTheme>,
        private readonly _testModel: Model<MongoTest>,
        private readonly _mongoThemeModelConverter: IConverter<ThemeDocument, Theme>,
    ) {
    }

    async getById (id: string): Promise<(ThemeParent & Theme) | null> {
        const ids: string[]           = this._splitId(id);
        const themes: ThemeDocument[] = await this._themeModel.find({
            $or: [
                { id: { $in: ids } },
            ],
        });

        return this._makeThemeParentsTree(id, themes.map(this._mongoThemeModelConverter.to));
    }

    async getByIdWithAll (id: string): Promise<ThemeParent & ThemeChildren & ThemeTests & ThemeBody & Theme> {
        throw new Error('Method not implemented.');
    }

    async getByIdWithBody (id: string): Promise<ThemeParent & ThemeBody & Theme> {
        throw new Error('Method not implemented.');
    }

    async getByIdWithTests (id: string): Promise<ThemeParent & ThemeTests & Theme> {
        throw new Error('Method not implemented.');
    }

    async getByIdWithChildren (id: string): Promise<ThemeParent & ThemeChildren & Theme> {
        const ids: string[]           = this._splitId(id);
        const themes: ThemeDocument[] = await this._themeModel.find({
            $or: [
                { id: { $in: ids } },
                { id: { $regex: `^${ ids[ids.length - 1] }` } },
            ],
        });

        const convertedThemes: Theme[] = themes.map(this._mongoThemeModelConverter.to);

        return {
            ...this._makeThemeParentsTree(id, convertedThemes),
            ...this._makeThemeChildrenTree(id, convertedThemes),
        };
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

    private _makeThemeParentsTree (id: string, themes: Theme[], theme: ThemeWith<[ ThemeParent ]> = null, parent: ThemeWith<[ ThemeParent ]> = null): ThemeWith<[ ThemeParent ]> {
        /**
         * TODO: Безопасность
         */
        if (!theme) {
            const start: ThemeWith<[ ThemeParent ]> = {
                ...themes.find((theme) => theme.id === id),
                parent: null,
            };
            return this._makeThemeParentsTree(id, themes, start, start);
        }
        const parentId: string | null = id.match(/(.+)-\d+$/)?.[1];
        if (parentId) {
            theme.parent = {
                ...themes.find((theme) => theme.id === parentId),
                parent: null,
            };
            return this._makeThemeParentsTree(parentId, themes, theme.parent, parent);
        } else {
            return parent;
        }
    }

    private _makeThemeTestTree (id: string, themes: Theme[], tests: TestWith<[ TestResults ]>[]): ThemeWith<[ ThemeTestResult ]>[] {
        return themes.map((theme) => {
            const withTest: ThemeWith<[ ThemeTestResult ]> = { ...theme, test: null };
            let lastTest: TestWith<[ TestResults ]>        = null;

            for (let i = 0; i < tests.length; i++) {
                if (tests[i].id === theme.id) {
                    if (!lastTest || (tests[i].results[0] && tests[i].results[0].finishTime > lastTest.results[0].finishTime)) {
                        lastTest.results = [ tests[i].results[0] ];
                    }
                }
            }

            return withTest;
        });
    }

    private _makeThemeChildrenTree (id: string, themes: Theme[], theme: ThemeWith<[ ThemeChildren ]> = null): ThemeWith<[ ThemeChildren ]> {
        /**
         * TODO: Безопасность
         */
        if (!theme) {
            const start: ThemeWith<[ ThemeChildren ]> = {
                ...themes.find((theme) => theme.id === id),
                children: [],
            };
            return this._makeThemeChildrenTree(id, themes, start);
        }
        const children: Theme[] = themes.filter((theme) => theme.id.match(new RegExp(`^${id}-\\d+$`)));
        theme.children          = children.map((child) =>
            this._makeThemeChildrenTree(
                child.id,
                themes,
                { ...child, children: [] },
            ),
        );
        return theme;
    }
}