import { ICRUD } from '@/domain/service.types';
import {
    ThemeCreateType,
    ThemeType,
    ThemeUpdateType,
} from '@/domain/services/theme/theme.types';


export interface IThemeService extends ICRUD<ThemeType, ThemeCreateType, ThemeUpdateType, string> {

}