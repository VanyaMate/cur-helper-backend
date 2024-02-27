import { QuestionToTestType } from '@vanyamate/cur-helper-types';


export interface IQuestionToTestService {
    addQuestionToTest (data: QuestionToTestType): Promise<boolean>;

    removeQuestionFromTest (data: QuestionToTestType): Promise<boolean>;
}