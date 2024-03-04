import { IConverter } from '@/domain/service.types';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { With } from '@/domain/types';
import { ThemeRecursiveChildren, ThemeShortType } from '@vanyamate/cur-helper-types';


export type ThemeChildrenConverterType = {
    currentId: string;
    children: ThemeDocument[];
}

export class MongoThemeRecursiveChildrenConverter implements IConverter<ThemeChildrenConverterType, ThemeRecursiveChildren> {
    constructor (private readonly _themeShortConverter: IConverter<ThemeDocument, ThemeShortType>) {
    }

    to (from: ThemeChildrenConverterType): ThemeRecursiveChildren {
        return {
            children: this
                ._findChildren(from.children, from.currentId)
                .map((child) =>
                    Object.assign(
                        this._themeShortConverter.to(child),
                        this.to({
                            children: from.children, currentId: child.publicId,
                        }),
                    ),
                ),
        };
    }

    from (to: ThemeRecursiveChildren): ThemeChildrenConverterType {
        throw new Error('Method not implemented.');
    }

    private _findChildren (from: ThemeDocument[], parentId: string): ThemeDocument[] {
        return from.filter((doc) => doc.publicId.match(new RegExp(`^${parentId}-\\d+$`)));
    }
}