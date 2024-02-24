import { With } from '@/domain/types';
import { AdminTestShortType, TestType } from '@/domain/services/test/test.types';
import {
    AdminTestQuestionsShort, AdminThemeShortType, AdminTestThemeShort,
    Filter,
    MultiplyResponse, Options,
} from '@vanyamate/cur-helper-types';


export interface IAdminTestsService {
    getOneById (id: string): Promise<With<TestType, [ AdminTestThemeShort, AdminTestQuestionsShort ]>>;

    getList (filter: Filter<AdminTestShortType>, options: Options<AdminTestShortType>): Promise<MultiplyResponse<AdminTestShortType>>;
}