import {
    ITestPassingService,
} from '@/domain/services/test-passing/test-passing-service.interface';
import {
    TestPassingProcess,
    TestPassingType,
    TestPassingResult,
} from '../../test-passing.types';
import { Model } from 'mongoose';
import {
    TestPassingDocument,
    TestPassingModel,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    TestRunningDocument,
    TestRunningModel,
} from '@/db/mongoose/test-running/test-running.model';
import { TestDocument, TestModel } from '@/db/mongoose/test/test.model';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import {
    TestPassingQuestionDocument,
    TestPassingQuestionModel,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';


export class MongoTestPassingService implements ITestPassingService {
    constructor (
        private readonly _testPassingRepository: Model<TestPassingModel>,
        private readonly _testRunningRepository: Model<TestRunningModel>,
        private readonly _testPassingQuestionRepository: Model<TestPassingQuestionModel>,
        private readonly _testRepository: Model<TestModel>,
    ) {
    }

    async start (userId: string, testId: string): Promise<TestPassingProcess & TestPassingType> {
        // TODO: Add converters
        const runningTest: TestRunningDocument = await this._testRunningRepository.findOne({
            userId,
            testId,
        }, {}, {
            populate: {
                path    : 'testPassing',
                populate: [
                    {
                        path    : 'questions',
                        populate: {
                            path    : 'question',
                            populate: {
                                path: 'answers',
                            },
                        },
                    },
                    {
                        path: 'test',
                    },
                ],
            },
        });

        // TODO: Converter
        if (runningTest) {
            return {
                id           : runningTest.testPassing._id.toString(),
                isPrivate    : runningTest.testPassing.isPrivate,
                status       : runningTest.testPassing.status,
                startTime    : runningTest.testPassing.startTime,
                questions    : runningTest.testPassing.questions.map(
                    ({ question: testQuestion, answerId }) => ({
                        id         : testQuestion._id.toString(),
                        title      : testQuestion.title,
                        description: testQuestion.description,
                        body       : testQuestion.body,
                        complexity : testQuestion.complexity,
                        answers    : testQuestion.answers.map((answer) => ({
                            id         : answer.id,
                            title      : answer.title,
                            enabled    : answer.enabled,
                            description: '',
                            correct    : false,
                        })),
                        enabled    : testQuestion.enabled,
                        points     : testQuestion.points,
                        selectId   : answerId ? answerId.toString() : null,
                    }),
                ),
                remainingTime: runningTest.testPassing.startTime - Date.now() + runningTest.testPassing.test.timeToPass,
            };
        } else {
            const testDocument: TestDocument                            = await this._testRepository.findOne({ _id: testId }, {}, {
                populate: {
                    path    : 'questions',
                    populate: {
                        path    : 'question',
                        populate: {
                            path: 'answers',
                        },
                    },
                },
            });
            // TODO: Validate : Если достаточно вопросов и всё такое
            const generatedQuestions: QuestionDocument[]                = testDocument.questions.map((question) => question.question);
            const generatedTestQuestions: TestPassingQuestionDocument[] = await this._testPassingQuestionRepository.create(
                generatedQuestions.map((question) => ({
                    questionId: question._id,
                    answerId  : null,
                })),
            );
            const testPassing: TestPassingDocument                      = await this._testPassingRepository.create({
                userId,
                testId,
                startTime   : Date.now(),
                questionsIds: generatedTestQuestions.map((question) => question._id),
            });
            // TODO: Дополнительно дается 5 секунд ко времени
            const testRunning: TestRunningDocument                      = await this._testRunningRepository.create({
                testPassingId: testPassing._id,
                userId       : userId,
                testId       : testId,
                finishTime   : Date.now() + testDocument.timeToPass + 5000,
            });
            return {
                id           : testPassing._id.toString(),
                isPrivate    : testPassing.isPrivate,
                status       : testPassing.status,
                startTime    : testPassing.startTime,
                questions    : generatedQuestions.map((testQuestion) => ({
                    id         : testQuestion._id.toString(),
                    title      : testQuestion.title,
                    description: testQuestion.description,
                    body       : testQuestion.body,
                    complexity : testQuestion.complexity,
                    answers    : testQuestion.answers.map((answer) => ({
                        id         : answer.id,
                        title      : answer.title,
                        enabled    : answer.enabled,
                        description: '',
                        correct    : false,
                    })),
                    enabled    : testQuestion.enabled,
                    points     : testQuestion.points,
                    selectId   : null,
                })),
                remainingTime: testDocument.timeToPass,
            };
        }
    }

    async finish (userId: string, testId: string): Promise<TestPassingResult & TestPassingType> {
        throw new Error('Method not implemented.');
    }

    async setAnswer (userId: string, testId: string, questionId: string, answerId: string): Promise<TestPassingProcess & TestPassingType> {
        throw new Error('Method not implemented.');
    }
}