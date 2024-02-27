import { ICRUD } from '@/domain/service.types';
import { TestCreateType, TestType, TestUpdateType } from '@vanyamate/cur-helper-types';


export interface ITestService extends ICRUD<TestType, TestCreateType, TestUpdateType, string> {

}