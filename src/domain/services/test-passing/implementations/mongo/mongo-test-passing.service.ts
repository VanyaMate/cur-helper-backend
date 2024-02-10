import {
    ITestPassingService,
} from '@/domain/services/test-passing/test-passing-service.interface';
import {
    TestPassingProcess,
    TestPassingType,
    TestPassingResult,
    TestPassingResults,
    TestPassingTestShort,
    TestPassingThemes,
    TestPassingUserShort,
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
import { NOT_FOUND } from '@/domain/exceptions/errors';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { ThemeShortType } from '@/domain/services/theme/theme.types';
import {
    GetTestPassingResult,
} from '@/domain/converters/test-passing-result/test-passing-result.types';
import { UserType } from '@/domain/services/user/user.types';
import { TestType } from '@/domain/services/test/test.types';


export class MongoTestPassingService implements ITestPassingService {
    constructor (
        private readonly _testPassingRepository: Model<TestPassingModel>,
        private readonly _testRunningRepository: Model<TestRunningModel>,
        private readonly _testPassingQuestionRepository: Model<TestPassingQuestionModel>,
        private readonly _testRepository: Model<TestModel>,
        private readonly _testPassingResultGetter: GetTestPassingResult,
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

    async finish (userId: string, testPassingId: string): Promise<TestPassingResults & TestPassingUserShort & TestPassingThemes & TestPassingTestShort & TestPassingType> {
        const runningTest: TestRunningDocument = await this._testRunningRepository.findOne({
            userId,
            testPassingId: testPassingId,
        }, {}, {
            populate: {
                path    : 'testPassing',
                populate: [
                    {
                        path    : 'questions',
                        populate: {
                            path    : 'question',
                            populate: [
                                {
                                    path: 'answers',
                                },
                                {
                                    path    : 'themes',
                                    populate: {
                                        path: 'theme',
                                    },
                                },
                            ],
                        },
                    },
                    {
                        path: 'test',
                    },
                    {
                        path: 'user',
                    },
                ],
            },
        });
        console.log('BEFORE', runningTest);
        if (!runningTest) {
            throw NOT_FOUND;
        }
        console.log('AFTER');
        const finishTime: number = Date.now();
        let rightAnswers: number = 0;

        // Перебрать все ответы, узнать сколько правильно
        runningTest.testPassing.questions.forEach((questionPassing) => {
            const answer: QuestionAnswerDocument | undefined = questionPassing.question.answers.find(
                (answer) => questionPassing.answerId?.toString() === answer._id.toString(),
            );
            if (answer) {
                if (answer.correct) {
                    rightAnswers += 1;
                }
            }
        });

        // Удалить runningDocument
        await runningTest.deleteOne();


        // Переписать testPassing
        const testPassing: TestPassingDocument = runningTest.testPassing;
        await testPassing.updateOne({
            rightAnswers,
            finishTime,
            status: 'finished',
        });

        console.log(testPassing.questions);
        console.log(testPassing.questions[0].question.answers);

        // TODO: Continue..

        return {
            id       : testPassing._id.toString(),
            isPrivate: testPassing.isPrivate,
            status   : 'finished',
            startTime: testPassing.startTime,
            questions: testPassing.questions.map(
                ({ question: testQuestion, answerTime }) => ({
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
                    answerTime : answerTime,
                    timeSpent  : 0,
                    // TODO: Ну в общем да
                    themes: testQuestion.themes.map((theme) => theme.theme) as unknown as ThemeShortType[],
                }),
            ),
            rightAnswers,
            finishTime,
            user     : testPassing.user as unknown as UserType,
            test     : testPassing.test as unknown as TestType,
            themes   : [],
            result   : this._testPassingResultGetter(rightAnswers, {
                perfect: testPassing.test.perfectScore,
                satis  : testPassing.test.satisfactoryScore,
                unsatis: testPassing.test.unsatisfactoryScore,
            }),
        };
    }

    async setAnswer (userId: string, testPassingId: string, questionId: string, answerId: string): Promise<TestPassingProcess & TestPassingType> {
        throw new Error('Method not implemented.');
    }

    async getById (userId: string, testPassingId: string): Promise<TestPassingProcess & TestPassingType> {
        throw new Error('Method not implemented.');
    }

    async getResultById (userId: string, testPassingId: string): Promise<TestPassingResults & TestPassingUserShort & TestPassingThemes & TestPassingTestShort & TestPassingType> {
        throw new Error('Method not implemented.');
    }
}