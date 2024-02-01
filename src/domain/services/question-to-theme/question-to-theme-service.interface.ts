import {
    QuestionToThemeType,
} from '@/domain/services/question-to-theme/question-to-theme.types';


export interface IQuestionToThemeService {
    addQuestionToTest (data: QuestionToThemeType): Promise<boolean>;

    removeQuestionFromTest (data: QuestionToThemeType): Promise<boolean>;
}