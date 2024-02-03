import {
    ThemeBreadcrumb,
    ThemeChildren,
    ThemeRecursiveChildren,
    ThemeTests,
} from '@/domain/services/themes/themes.types';
import { With } from '@/domain/types';
import { ThemeShortType, ThemeType } from '@/domain/services/theme/theme.types';


export interface IThemesService {
    getThemeFullDataByPublicId (publicId: string): Promise<With<ThemeType, [ ThemeChildren, ThemeTests, ThemeBreadcrumb ]>>;

    getThemeListById (publicId: string): Promise<With<ThemeShortType, [ ThemeRecursiveChildren]> & ThemeBreadcrumb>;

    getThemesList (): Promise<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>;
}