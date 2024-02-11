import { Create } from '@/domain/types';


export type ThemeType = {
    id: string;
    publicId: string;
    enabled: boolean;
    title: string;
    description: string;
    additional: string;
    body: string;
    url: string;
}

export type ThemeCreateType = Create<ThemeType, 'publicId' | 'title'>;
export type ThemeUpdateType = Partial<ThemeType>;
export type ThemeShortType = Pick<ThemeType, 'publicId' | 'title' | 'url' | 'additional'>;