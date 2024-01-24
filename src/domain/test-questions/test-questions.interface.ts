export interface ITestQuestions {
    addQuestionTo (testId: string, questionId: string): Promise<boolean>;

    addQuestionsTo (testId: string, questions: string[]): Promise<boolean>;

    removeQuestionFrom (testId: string, questionId: string): Promise<boolean>;

    removeAllQuestionsFromTest (testId: string): Promise<boolean>;

    removeAllQuestionLinks (questionId: string): Promise<boolean>;
}