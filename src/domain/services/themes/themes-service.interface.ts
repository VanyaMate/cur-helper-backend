import {
    ThemeBreadcrumb,
    ThemeChildren, ThemeNext, ThemePrev,
    ThemeRecursiveChildren,
    ThemeTests,
} from '@/domain/services/themes/themes.types';
import { With } from '@/domain/types';
import { ThemeShortType, ThemeType } from '@/domain/services/theme/theme.types';


export interface IThemesService {
    getThemeFullDataByPublicId (publicId: string): Promise<With<ThemeType, [ ThemeChildren, ThemeTests, ThemeBreadcrumb, ThemeNext, ThemePrev ]>>;

    getThemeListById (publicId: string): Promise<With<ThemeShortType, [ ThemeRecursiveChildren ]> & ThemeBreadcrumb>;

    getThemesList (): Promise<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>;
}