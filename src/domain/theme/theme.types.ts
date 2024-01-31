import { Create } from '@/domain/types';


export type ThemeType = {
    id: string;
    title: string;
    description: string;
    body: string;
}

export type ThemeCreateType = Create<ThemeType, 'id' | 'title'>;
export type ThemeUpdateType = Partial<ThemeType>;