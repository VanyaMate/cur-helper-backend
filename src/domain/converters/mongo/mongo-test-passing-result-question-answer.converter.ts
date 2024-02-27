import { IConverter } from '@/domain/service.types';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { QuestionAnswerType } from '@vanyamate/cur-helper-types';


export type TestPassingResultQuestionAnswerProps = {
    selectedId: string | null;
    answer: QuestionAnswerDocument;
}

export class MongoTestPassingResultQuestionAnswerConverter implements IConverter<TestPassingResultQuestionAnswerProps, QuestionAnswerType> {
    to (from: TestPassingResultQuestionAnswerProps): QuestionAnswerType {
        const selected: boolean = from.answer._id.toString() === from.selectedId;

        return {
            id         : from.answer._id.toString(),
            title      : from.answer.title,
            description: selected ? from.answer.description : '',
            enabled    : from.answer.enabled,
            correct    : selected ? from.answer.correct : false,
        };
    }

    from (to: QuestionAnswerType): TestPassingResultQuestionAnswerProps {
        throw new Error('Method not implemented.');
    }
}