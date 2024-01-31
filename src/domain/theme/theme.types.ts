import { Create } from '@/domain/types';


export type ThemeType = {
    id: string;
    enabled: boolean;
    title: string;
    description: string;
    additional: string;
    body: string;
    url: string;
}

export type ThemeCreateType = Create<ThemeType, 'id' | 'title'>;
export type ThemeUpdateType = Partial<ThemeType>;
export type ThemeShortType = Pick<ThemeType, 'id' | 'title' | 'url'>;