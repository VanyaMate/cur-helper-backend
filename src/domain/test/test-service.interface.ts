import { ICRUD } from '@/domain/service.types';
import { Test } from '@/domain/test/test.types';


type CreateTestFields =
    'id'
    | 'title'
    | 'timeToPass'
    | 'questionsAmount';
export type CreateTestType =
    Pick<Test, CreateTestFields>
    &
    Partial<Omit<Test, CreateTestFields>>

export type UpdateTestType = Partial<Test>;

export interface ITestService extends ICRUD<Test, CreateTestType, UpdateTestType, string> {

}