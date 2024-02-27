import { With } from '@/domain/types';
import {
    ThemeBreadcrumb,
    ThemeChildren, ThemeNext, ThemePrev, ThemeRecursiveChildren, ThemeShortType,
    ThemeTestsWithShortResults, ThemeType,
} from '@vanyamate/cur-helper-types';


export interface IThemesService {
    getThemeFullDataByPublicId (publicId: string, userId?: string): Promise<With<ThemeType, [ ThemeChildren, ThemeTestsWithShortResults, ThemeBreadcrumb, ThemeNext, ThemePrev ]>>;

    getThemeListById (publicId: string): Promise<With<ThemeShortType, [ ThemeRecursiveChildren ]> & ThemeBreadcrumb>;

    getThemesList (): Promise<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>;
}