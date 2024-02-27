import {
    IQuestionToTestService,
} from '@/domain/services/question-to-test/question-to-test-service.interface';
import { Model } from 'mongoose';
import { QuestionDocument, QuestionModel } from '@/db/mongoose/question/question.model';
import {
    QuestionToTestDocument,
    QuestionToTestModel,
} from '@/db/mongoose/question-to-test/question-to-test.model';
import { TestDocument, TestModel } from '@/db/mongoose/test/test.model';
import { NO_VALID, NOT_FOUND } from '@/domain/exceptions/errors';
import { QuestionToTestType } from '@vanyamate/cur-helper-types';


export class MongoQuestionToTestService implements IQuestionToTestService {
    constructor (
        private readonly _mongoQuestionRepository: Model<QuestionModel>,
        private readonly _mongoTestRepository: Model<TestModel>,
        private readonly _mongoQuestionToTestRepository: Model<QuestionToTestModel>,
    ) {
    }

    async addQuestionToTest (data: QuestionToTestType): Promise<boolean> {
        try {
            if (!data.testId || !data.questionId) {
                throw NO_VALID;
            }

            const [ questionDoc, testDoc, linkDoc ]: [ QuestionDocument | null, TestDocument | null, QuestionToTestDocument | null ] = await Promise.all([
                this._mongoQuestionRepository.findOne({ _id: data.questionId }),
                this._mongoTestRepository.findOne({ _id: data.testId }),
                this._mongoQuestionToTestRepository.findOne({
                    testId: data.testId, questionId: data.questionId,
                }),
            ]);

            if (questionDoc && testDoc) {
                if (linkDoc) {
                    return false;
                }

                await this._mongoQuestionToTestRepository.create({
                    testId: testDoc._id, questionId: questionDoc._id,
                });
                return true;
            }

            throw NOT_FOUND;
        } catch (e) {
            throw e;
        }
    }

    async removeQuestionFromTest (data: QuestionToTestType): Promise<boolean> {
        if (!data.testId || !data.questionId) {
            throw NO_VALID;
        }

        return !!(await this._mongoQuestionToTestRepository.deleteOne({
            questionId: data.questionId, testId: data.testId,
        })).deletedCount;
    }

}