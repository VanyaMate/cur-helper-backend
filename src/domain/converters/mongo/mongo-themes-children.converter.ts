import { IConverter } from '@/domain/service.types';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { With } from '@/domain/types';
import { ThemeRecursiveChildren, ThemeShortType } from '@vanyamate/cur-helper-types';


export type ThemeChildrenConverterType = {
    currentId: string;
    children: ThemeDocument[];
}

export class MongoThemesChildrenConverter implements IConverter<ThemeChildrenConverterType, With<ThemeShortType, [ ThemeRecursiveChildren ]>[]> {
    constructor (private readonly _themeConverter: IConverter<ThemeDocument, ThemeShortType>) {
    }

    to (from: ThemeChildrenConverterType): (ThemeRecursiveChildren & ThemeShortType)[] {
        return this._findChildren(from.children, from.currentId).map((child) => ({
            ...this._themeConverter.to(child),
            children: this.to({ children: from.children, currentId: child.publicId }),
        }));
    }

    from (to: (ThemeRecursiveChildren & ThemeShortType)[]): ThemeChildrenConverterType {
        throw new Error('Method not implemented.');
    }

    private _findChildren (from: ThemeDocument[], parentId: string): ThemeDocument[] {
        return from.filter((doc) => doc.publicId.match(new RegExp(`^${parentId}-\\d+$`)));
    }
}