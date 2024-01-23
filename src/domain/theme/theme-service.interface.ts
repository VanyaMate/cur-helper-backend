import { ICRUD } from '../service.types';
import {
    Theme as ThemeDefault,
    ThemeBody,
    ThemeChildren,
} from './theme.types';


export type Theme =
    ThemeDefault
    & Partial<ThemeBody>
    & Partial<ThemeChildren>;

export type CreateThemeData =
    Pick<Theme, 'id' | 'title'>
    & Partial<Pick<Theme, 'description' | 'url' | 'body' | 'children' | 'additional'>>

export type UpdateThemeData = Partial<Theme>;

export interface IThemeService extends ICRUD<Theme, CreateThemeData, UpdateThemeData, Theme['id']> {
}