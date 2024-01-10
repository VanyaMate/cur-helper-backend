import { Filter, MultiplyResponse, Options } from '@/domain/service.types';
import { Theme, ThemeWithChildren } from '@/domain/theme/theme.types';


export interface IThemesService {
    findOne ();

    findMany (filter: Filter<Theme>, options: Options<Theme>): Promise<MultiplyResponse<Theme>>;

    findManyManyWithChildren (filter: Filter<Theme>, options: Options<Theme>): Promise<MultiplyResponse<ThemeWithChildren>>;
}