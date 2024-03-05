import {
    ICRUD,
    TestCreateType,
    TestType,
    TestUpdateType,
} from '@vanyamate/cur-helper-types';


export interface ITestService extends ICRUD<TestType, TestCreateType, TestUpdateType, string> {

}