export interface ITestQuestions {
    add (testId: string, questionId: string): Promise<boolean>;

    addQuestionsTo (testId: string, questions: string[]): Promise<boolean>;

    remove (testId: string, questionId: string): Promise<boolean>;

    removeAllQuestionsFromTest (testId: string): Promise<boolean>;

    removeAllQuestionsLink (questionId: string): Promise<boolean>;
}