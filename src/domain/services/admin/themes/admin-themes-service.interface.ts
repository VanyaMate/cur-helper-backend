import {
    AdminThemeType,
    Options,
    Filter,
    MultiplyResponse,
    AdminThemeShortType,
} from '@vanyamate/cur-helper-types';


export interface IAdminThemesService {
    getOneTheme (publicId: string): Promise<AdminThemeType>;

    getList (filter: Filter<AdminThemeShortType>, options: Options<AdminThemeShortType>): Promise<MultiplyResponse<AdminThemeShortType>>;

    findManyUnlinkedForQuestion (questionId: string, filter: Filter<AdminThemeShortType>, options: Options<AdminThemeShortType>): Promise<MultiplyResponse<AdminThemeShortType>>;
}