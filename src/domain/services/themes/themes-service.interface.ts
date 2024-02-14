import {
    ThemeBreadcrumb,
    ThemeChildren, ThemeNext, ThemePrev,
    ThemeRecursiveChildren,
    ThemeTests, ThemeTestsWithShortResults,
} from '@/domain/services/themes/themes.types';
import { With } from '@/domain/types';
import { ThemeShortType, ThemeType } from '@/domain/services/theme/theme.types';


export interface IThemesService {
    getThemeFullDataByPublicId (publicId: string, userId?: string): Promise<With<ThemeType, [ ThemeChildren, ThemeTestsWithShortResults, ThemeBreadcrumb, ThemeNext, ThemePrev ]>>;

    getThemeListById (publicId: string): Promise<With<ThemeShortType, [ ThemeRecursiveChildren ]> & ThemeBreadcrumb>;

    getThemesList (): Promise<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>;
}