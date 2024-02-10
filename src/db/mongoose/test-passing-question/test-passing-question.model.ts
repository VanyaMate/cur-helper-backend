import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';


@Schema()
export class TestPassingQuestionModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'QuestionModel' })
    questionId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'QuestionAnswerModel' })
    answerId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Number, default: -1 })
    answerTime: number;

    @Prop({ type: Number, default: -1 })
    timeSpent: number;

    answer?: QuestionAnswerDocument;
    question?: QuestionDocument;
}

export const TestPassingQuestionSchema = SchemaFactory.createForClass(TestPassingQuestionModel);
export type TestPassingQuestionDocument = HydratedDocument<TestPassingQuestionModel>;

TestPassingQuestionSchema.virtual('question', {
    ref         : 'QuestionModel',
    localField  : 'questionId',
    foreignField: '_id',
    justOne     : true,
});

TestPassingQuestionSchema.virtual('answer', {
    ref         : 'QuestionAnswerModel',
    localField  : 'answerId',
    foreignField: '_id',
    justOne     : true,
});