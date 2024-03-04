import {
    IConverter, ThemeRecursiveChildren, ThemeRecursiveType,
    ThemeShortType,
} from '@vanyamate/cur-helper-types';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import {
    ThemeChildrenConverterType,
} from '@/domain/converters/mongo/mongo-theme-recursive-children.converter';


export type ThemeListConverterDocumentsType = {
    parentThemes: ThemeDocument[];
    themes: ThemeDocument[];
}

export class MongoThemeRecursiveConverter implements IConverter<ThemeListConverterDocumentsType, ThemeRecursiveType[]> {
    constructor (
        private readonly _themeShortConverter: IConverter<ThemeDocument, ThemeShortType>,
        private readonly _themeRecursiveChildrenConverter: IConverter<ThemeChildrenConverterType, ThemeRecursiveChildren>,
    ) {
    }

    to (from: ThemeListConverterDocumentsType): ThemeRecursiveType[] {
        return from.parentThemes.map((theme) =>
            Object.assign(
                this._themeShortConverter.to(theme),
                this._themeRecursiveChildrenConverter.to({
                    children : from.themes,
                    currentId: theme.publicId,
                }),
            ),
        );
    }

    from (to: ThemeRecursiveType[]): ThemeListConverterDocumentsType {
        throw new Error('Method not implemented.');
    }

}