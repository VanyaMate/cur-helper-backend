import {
    ThemeBody,
    ThemeChildren,
    ThemeParent, ThemeTests, ThemeWith,
} from '@/domain/theme/theme.types';


export interface IThemesService {
    getById (id: string): Promise<ThemeWith<[ ThemeParent ]> | null>;

    getByIdWithAll (id: string): Promise<ThemeWith<[ ThemeParent, ThemeChildren, ThemeTests, ThemeBody ]> | null>;

    getByIdWithBody (id: string): Promise<ThemeWith<[ ThemeParent, ThemeBody ]> | null>;

    getByIdWithTests (id: string): Promise<ThemeWith<[ ThemeParent, ThemeTests ]> | null>;

    getByIdWithChildren (id: string): Promise<ThemeWith<[ ThemeParent, ThemeChildren ]> | null>;
}