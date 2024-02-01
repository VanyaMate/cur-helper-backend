import {
    QuestionToTestType,
} from '@/domain/services/question-to-test/question-to-test.types';


export interface IQuestionToTestService {
    addQuestionToTest (data: QuestionToTestType): Promise<boolean>;

    removeQuestionFromTest (data: QuestionToTestType): Promise<boolean>;
}