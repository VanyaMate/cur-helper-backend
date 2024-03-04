import {
    ThemeChildrenType,
    ThemeFullType,
    ThemeRecursiveType,
} from '@vanyamate/cur-helper-types';


export interface IThemesService {
    getThemeFullDataByPublicId (publicId: string, userId?: string): Promise<ThemeFullType>;

    getThemeListById (publicId: string): Promise<ThemeChildrenType>;

    getThemesList (): Promise<ThemeRecursiveType[]>;
}