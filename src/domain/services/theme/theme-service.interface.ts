import { ICRUD, ThemeCreateType, ThemeType, ThemeUpdateType } from '@vanyamate/cur-helper-types';


export interface IThemeService extends ICRUD<ThemeType, ThemeCreateType, ThemeUpdateType, string> {

}