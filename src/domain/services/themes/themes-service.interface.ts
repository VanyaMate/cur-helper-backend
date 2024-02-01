import {
    ThemeBreadcrumb,
    ThemeChildren, ThemeQuestions,
    ThemeTests,
    ThemeWith,
} from '@/domain/services/themes/themes.types';


export interface IThemesService {
    getThemeFullDataByPublicId (publicId: string): Promise<ThemeWith<[ ThemeChildren, ThemeTests, ThemeQuestions, ThemeBreadcrumb ]>>;

    getThemeWithChildren (publicId: string): Promise<ThemeWith<[ ThemeChildren, ThemeBreadcrumb ]>>;
}