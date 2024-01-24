import { ITestQuestions } from '@/domain/test-questions/test-questions.interface';
import { Model } from 'mongoose';
import {
    TestQuestionsLink,
} from '@/domain/test-questions/implementations/mongo/mongo-test-questions.model';


export class MongoTestQuestionsService implements ITestQuestions {
    constructor (
        private readonly _testQuestionsModel: Model<TestQuestionsLink>,
    ) {
    }

    async addQuestionTo (testId: string, questionId: string): Promise<boolean> {
        try {
            await this._testQuestionsModel.create({ testId, questionId });
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async addQuestionsTo (testId: string, questions: string[]): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async removeQuestionFrom (testId: string, questionId: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async removeAllQuestionsFromTest (testId: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async removeAllQuestionLinks (questionId: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}