import { QuestionToThemeType } from '@vanyamate/cur-helper-types';


export interface IQuestionToThemeService {
    addQuestionToTheme (data: QuestionToThemeType): Promise<boolean>;

    addQuestionToThemeByPublicId (data: QuestionToThemeType): Promise<boolean>;

    removeQuestionFromTheme (data: QuestionToThemeType): Promise<boolean>;

    removeQuestionFromThemeByPublicId (data: QuestionToThemeType): Promise<boolean>;
}