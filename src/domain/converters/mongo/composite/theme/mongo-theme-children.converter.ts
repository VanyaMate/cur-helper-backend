import {
    IConverter,
    ThemeChildrenType,
    ThemeShortType,
} from '@vanyamate/cur-helper-types';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import {
    ThemeChildrenConverterType,
} from '@/domain/converters/mongo/mongo-theme-recursive-children.converter';
import { ThemeRecursiveChildren } from '@vanyamate/cur-helper-types/types/themes';


export type ThemeListByIdConverterDocumentsType = {
    theme: ThemeDocument;
    children: ThemeDocument[];
    breadcrumb: ThemeDocument[];
}

export class MongoThemeChildrenConverter implements IConverter<ThemeListByIdConverterDocumentsType, ThemeChildrenType> {
    constructor (
        private readonly _themeShortConverter: IConverter<ThemeDocument, ThemeShortType>,
        private readonly _themeRecursiveChildrenConverter: IConverter<ThemeChildrenConverterType, ThemeRecursiveChildren>,
    ) {
    }

    to (from: ThemeListByIdConverterDocumentsType): ThemeChildrenType {
        return Object.assign(
            this._themeShortConverter.to(from.theme),
            this._themeRecursiveChildrenConverter.to({
                children : from.children,
                currentId: from.theme.publicId,
            }),
            {
                breadcrumb: from.breadcrumb.map(this._themeShortConverter.to),
            },
        );
    }

    from (to: ThemeChildrenType): ThemeListByIdConverterDocumentsType {
        throw new Error('Method not implemented.');
    }
}