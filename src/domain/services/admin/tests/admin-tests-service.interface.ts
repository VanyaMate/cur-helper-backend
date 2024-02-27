import { With } from '@/domain/types';
import {
    AdminTestQuestionsShort, AdminTestShortType, AdminTestThemeShort,
    Filter,
    MultiplyResponse, Options, TestType,
} from '@vanyamate/cur-helper-types';


export interface IAdminTestsService {
    getOneById (id: string): Promise<With<TestType, [ AdminTestThemeShort, AdminTestQuestionsShort ]>>;

    getList (filter: Filter<AdminTestShortType>, options: Options<AdminTestShortType>): Promise<MultiplyResponse<AdminTestShortType>>;
}