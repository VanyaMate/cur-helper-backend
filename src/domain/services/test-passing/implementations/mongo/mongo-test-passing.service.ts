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
import { TestShortType, TestType } from '@/domain/services/test/test.types';
import { IConverter } from '@/domain/service.types';
import { UserDocument } from '@/db/mongoose/user/user.model';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';


export class MongoTestPassingService implements ITestPassingService {
    constructor (
        private readonly _testPassingRepository: Model<TestPassingModel>,
        private readonly _testRunningRepository: Model<TestRunningModel>,
        private readonly _testPassingQuestionRepository: Model<TestPassingQuestionModel>,
        private readonly _testRepository: Model<TestModel>,
        private readonly _testPassingConverter: IConverter<TestPassingDocument, TestPassingType>,
        private readonly _testPassingProcessConverter: IConverter<TestPassingDocument, TestPassingProcess>,
        private readonly _testPassingResultsConverter: IConverter<TestPassingDocument, TestPassingResults>,
        private readonly _testConverter: IConverter<TestDocument, TestShortType>,
        private readonly _userConverter: IConverter<UserDocument, UserType>,
        private readonly _themeShortConverter: IConverter<ThemeDocument, ThemeShortType>,
        private readonly _getTestPassingResult: GetTestPassingResult,
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
                ...this._testPassingConverter.to(runningTest.testPassing),
                ...this._testPassingProcessConverter.to(runningTest.testPassing),
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

            const emptyTestPassing: TestPassingDocument = await this._testPassingRepository.create({
                userId,
                testId,
                startTime   : Date.now(),
                questionsIds: generatedTestQuestions.map((question) => question._id),
            });

            const testPassing: TestPassingDocument = await emptyTestPassing.populate({
                path    : 'questions',
                populate: {
                    path    : 'question',
                    populate: {
                        path: 'answers',
                    },
                },
            });

            testPassing.test = testDocument;

            // TODO: Дополнительно дается 5 секунд ко времени
            const testRunning: TestRunningDocument = await this._testRunningRepository
                .create({
                    testPassingId: testPassing._id,
                    userId       : userId,
                    testId       : testId,
                    finishTime   : Date.now() + testDocument.timeToPass + 5000,
                });
            return {
                ...this._testPassingConverter.to(testPassing),
                ...this._testPassingProcessConverter.to(testPassing),
            };
        }
    }

    async finish (userId: string, testPassingId: string): Promise<TestPassingResults & TestPassingUserShort & TestPassingThemes & TestPassingTestShort & TestPassingType> {
        const runningTest: TestRunningDocument = await this._testRunningRepository.findOne({
            userId,
            testPassingId,
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
        if (!runningTest) {
            throw NOT_FOUND;
        }
        const finishTime: number      = Date.now();
        let rightAnswers: number      = 0;
        const themes: ThemeDocument[] = [];

        // Перебрать все ответы, узнать сколько правильно
        runningTest.testPassing.questions.forEach((questionPassing) => {
            const answer: QuestionAnswerDocument | undefined = questionPassing.question.answers.find(
                (answer) => questionPassing.answerId?.toString() === answer._id.toString(),
            );
            themes.push(...questionPassing.question.themes.map((theme) => theme.theme));
            if (answer) {
                if (answer.correct) {
                    rightAnswers += 1;
                }
            }
        });
        const result: TestPassingResult = this._getTestPassingResult(rightAnswers, {
            perfect: runningTest.testPassing.test.perfectScore,
            satis  : runningTest.testPassing.test.satisfactoryScore,
            unsatis: runningTest.testPassing.test.unsatisfactoryScore,
        });

        // Удалить runningDocument
        await runningTest.deleteOne();

        // Переписать testPassing
        const testPassing: TestPassingDocument = runningTest.testPassing;
        testPassing.rightAnswers               = rightAnswers;
        testPassing.finishTime                 = finishTime;
        testPassing.result                     = result;
        testPassing.status                     = 'finished';

        await testPassing.save();

        return {
            ...this._testPassingConverter.to(testPassing),
            ...this._testPassingResultsConverter.to(testPassing),
            user  : this._userConverter.to(testPassing.user),
            test  : this._testConverter.to(testPassing.test),
            themes: themes.map(this._themeShortConverter.to.bind(this._themeShortConverter)),
        };
    }

    async setAnswer (userId: string, testPassingId: string, questionId: string, answerId: string): Promise<boolean> {
        const runningTest: TestRunningDocument | null = await this._testRunningRepository.findOne({
            userId, testPassingId,
        }, {}, {
            populate: {
                path    : 'testPassing',
                populate: {
                    path    : 'questions',
                    populate: {
                        path    : 'question',
                        populate: {
                            path: 'answers',
                        },
                    },
                },
            },
        });

        if (!runningTest) {
            return false;
        }

        for (let i = 0; i < runningTest.testPassing.questions.length; i++) {
            const question: TestPassingQuestionDocument = runningTest.testPassing.questions[i];
            if (question._id.toString() === questionId) {
                for (let j = 0; j < question.question.answers.length; j++) {
                    const answer: QuestionAnswerDocument = question.question.answers[j];
                    if (answer._id.toString() === answerId) {
                        await question.updateOne({
                            answerId: answer._id,
                        });
                        return true;
                    }
                }
                return false;
            }
        }
        return false;
    }

    async getById (userId: string, testPassingId: string): Promise<TestPassingProcess & TestPassingType> {
        const testPassing: TestPassingDocument = await this._testPassingRepository.findOne({
            userId,
            _id: testPassingId,
        }, {}, {
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
        });

        return {
            ...this._testPassingConverter.to(testPassing),
            ...this._testPassingProcessConverter.to(testPassing),
        };
    }

    async getResultById (userId: string, testPassingId: string): Promise<TestPassingResults & TestPassingUserShort & TestPassingThemes & TestPassingTestShort & TestPassingType> {
        const testPassing: TestPassingDocument | null = await this._testPassingRepository.findOne({
            userId,
            _id: testPassingId,
        }, {}, {
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
        });

        const themes: ThemeDocument[] = testPassing.questions.reduce((acc, question) => {
            acc.push(...question.question.themes.map((theme) => theme.theme));
            return acc;
        }, []);

        // Если не закончено
        if (testPassing.status === 'process') {
            testPassing.questions.forEach((question) => {
                question.question.answers.forEach((answer) => {
                    answer.correct     = false;
                    answer.description = '';
                });
            });
        }

        return {
            ...this._testPassingConverter.to(testPassing),
            ...this._testPassingResultsConverter.to(testPassing),
            user  : this._userConverter.to(testPassing.user),
            test  : this._testConverter.to(testPassing.test),
            themes: themes.map(this._themeShortConverter.to.bind(this._themeShortConverter)),
        };
    }
}