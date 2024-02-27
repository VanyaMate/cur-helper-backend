import { QuestionToThemeType } from '@vanyamate/cur-helper-types';


export interface IQuestionToThemeService {
    addQuestionToTest (data: QuestionToThemeType): Promise<boolean>;

    removeQuestionFromTest (data: QuestionToThemeType): Promise<boolean>;
}