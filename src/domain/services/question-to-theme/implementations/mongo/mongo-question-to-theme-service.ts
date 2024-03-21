import {
    IQuestionToThemeService,
} from '@/domain/services/question-to-theme/question-to-theme-service.interface';
import { Model } from 'mongoose';
import { QuestionDocument, QuestionModel } from '@/db/mongoose/question/question.model';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import {
    QuestionToThemeDocument,
    QuestionToThemeModel,
} from '@/db/mongoose/question-to-theme/question-to-theme.model';
import { NO_VALID, NOT_FOUND } from '@/domain/exceptions/errors';
import { QuestionToThemeType } from '@vanyamate/cur-helper-types';


export class MongoQuestionToThemeService implements IQuestionToThemeService {
    constructor (
        private readonly _mongoQuestionRepository: Model<QuestionModel>,
        private readonly _mongoThemeRepository: Model<ThemeModel>,
        private readonly _mongoQuestionToThemeRepository: Model<QuestionToThemeModel>,
    ) {
    }

    async addQuestionToTheme (data: QuestionToThemeType): Promise<boolean> {
        try {
            if (!data.themeId || !data.questionId) {
                throw NO_VALID;
            }

            const [ questionDoc, themeDoc, linkDoc ]: [ QuestionDocument | null, ThemeDocument | null, QuestionToThemeDocument | null ] = await Promise.all([
                this._mongoQuestionRepository.findOne({ _id: data.questionId }),
                this._mongoThemeRepository.findOne({ _id: data.themeId }),
                this._mongoQuestionToThemeRepository.findOne({
                    themeId: data.themeId, questionId: data.questionId,
                }),
            ]);

            if (questionDoc && themeDoc) {
                if (linkDoc) {
                    return false;
                }

                await this._mongoQuestionToThemeRepository.create({
                    themeId: themeDoc._id, questionId: questionDoc._id,
                });
                return true;
            }

            throw NOT_FOUND;
        } catch (e) {
            throw e;
        }
    }

    async addQuestionToThemeByPublicId (data: QuestionToThemeType): Promise<boolean> {
        try {
            if (!data.themeId || !data.questionId) {
                throw NO_VALID;
            }

            const [ questionDoc, themeDoc ]: [ QuestionDocument | null, ThemeDocument | null ] = await Promise.all([
                this._mongoQuestionRepository.findOne({ _id: data.questionId }),
                this._mongoThemeRepository.findOne({ publicId: data.themeId }),
            ]);

            if (questionDoc && themeDoc) {
                const linkDoc = await this._mongoQuestionToThemeRepository.findOne({
                    themeId: themeDoc._id, questionId: questionDoc._id,
                });

                if (linkDoc) {
                    return false;
                }

                await this._mongoQuestionToThemeRepository.create({
                    themeId: themeDoc._id, questionId: questionDoc._id,
                });
                return true;
            }

            throw NOT_FOUND;
        } catch (e) {
            throw e;
        }
    }

    async removeQuestionFromThemeByPublicId (data: QuestionToThemeType): Promise<boolean> {
        throw new Error('Mthod not implement');
    }


    async removeQuestionFromTheme (data: QuestionToThemeType): Promise<boolean> {
        if (!data.themeId || !data.questionId) {
            throw NO_VALID;
        }

        return !!(await this._mongoQuestionToThemeRepository.deleteOne({
            questionId: data.questionId, themeId: data.themeId,
        })).deletedCount;
    }
}