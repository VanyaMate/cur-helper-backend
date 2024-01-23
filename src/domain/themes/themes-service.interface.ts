import {
    ThemeBody,
    ThemeChildren,
    ThemeParent, ThemeTests, ThemeWith,
} from '@/domain/theme/theme.types';


export interface IThemesService {
    getByIds (id: string): Promise<ThemeWith<[ ThemeParent ]> | null>;

    getByIdsWithAll (id: string): Promise<ThemeWith<[ ThemeParent, ThemeChildren, ThemeTests, ThemeBody ]> | null>;

    getByIdsWithBody (id: string): Promise<ThemeWith<[ ThemeParent, ThemeBody ]> | null>;

    getByIdsWithTests (id: string): Promise<ThemeWith<[ ThemeParent, ThemeTests ]> | null>;

    getByIdsWithChildren (id: string): Promise<ThemeWith<[ ThemeParent, ThemeChildren ]> | null>;
}