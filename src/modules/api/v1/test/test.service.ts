import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import { Model } from 'mongoose';
import {
    QuestionModel,
} from '@/db/mongoose/question/question.model';
import { TestModel } from '@/db/mongoose/test/test.model';
import {
    QuestionToTestModel,
} from '@/db/mongoose/question-to-test/question-to-test.model';


@Injectable()
export class TestService {
    constructor (
        @InjectModel(ThemeModel.name) private readonly _themeModel: Model<ThemeModel>,
        @InjectModel(TestModel.name) private readonly _testModel: Model<TestModel>,
        @InjectModel(QuestionModel.name) private readonly _questionModel: Model<QuestionModel>,
        @InjectModel(QuestionToTestModel.name) private readonly _questionToTestModel: Model<QuestionToTestModel>,
    ) {
    }

    async createTheme (showedId: string, title: string): Promise<any> {
        return this._themeModel
            .create({ showedId, title })
            .then((doc) => doc.toJSON());
    }

    async getThemes (id: string): Promise<any> {
        return this._themeModel
            .find({
                $or: [
                    { showedId: { $regex: `^${ id }` } },
                ],
            })
            .then((docs) => docs.map((doc) => doc.toJSON()));
    }

    async createTest (themeId: string, title: string): Promise<any> {
        const theme = await this._themeModel.findOne({ showedId: themeId });
        if (!theme) {
            return null;
        }
        return this._testModel
            .create({ themeId: theme._id, title })
            .then((doc) => doc.toJSON());
    }

    async getTests (id: string): Promise<any> {
        const theme = await this._themeModel.findOne({ showedId: id });
        if (!theme) {
            return null;
        }
        return this._testModel
            .find({ themeId: theme._id })
            .populate('questions')
            .then((docs) => docs.map((doc) => doc.toJSON()));
    }

    async createQuestion (themeId: string, title: string, answers: {
        title: string,
        correct: boolean
    }[]): Promise<any> {
        const theme = await this._themeModel.findOne({ showedId: themeId });
        if (!theme) {
            return null;
        }
        return this._questionModel
            .create({ themeId: theme._id, title, answers })
            .then((doc) => doc.toJSON());
    }

    async addQuestion (testId: string, questionId: string): Promise<any> {
        console.log(testId, questionId);
        const question = await this._questionToTestModel.findOne({ testId, questionId });
        if (question) {
            console.log(question);
            return 'added';
        }
        Promise
            .all([
                this._questionModel.findOne({ _id: questionId }),
                this._testModel.findOne({ _id: testId }),
            ])
            .then(([ question, test ]) => {
                return this._questionToTestModel.create({
                    testId: test._id, questionId: question._id,
                }).then((doc) => doc.toJSON());
            })
            .catch(() => 'error');
    }

    async getQuestions (id: string): Promise<any> {
        const theme = await this._themeModel.findOne({ showedId: id });
        if (!theme) {
            return null;
        }
        return this._questionModel
            .find({ themeId: theme._id })
            .then((docs) => docs.map((doc) => doc.toJSON()));
    }

    async addAnswer (questionId: string, answer: {
        title: string,
        correct: boolean
    }): Promise<any> {
        const question = await this._questionModel.findOne({ _id: questionId });
        return question.updateOne({ answers: [ ...question.answers, answer ] });
    }
}