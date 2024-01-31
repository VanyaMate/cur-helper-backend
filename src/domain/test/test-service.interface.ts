import { ICRUD } from '@/domain/service.types';
import { TestCreateType, TestType, TestUpdateType } from '@/domain/test/test.types';


export interface ITestService extends ICRUD<TestType, TestCreateType, TestUpdateType, string> {

}