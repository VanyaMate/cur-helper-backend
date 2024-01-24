import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TestQuestionLink } from '@/domain/test-questions/test-questions.types';
import { Test } from '@/domain/test/implementations/mongo/mongo-test.model';
import { Question } from '@/domain/question/implementations/mongo/mongo-question.model';


@Schema()
export class TestQuestionsLink {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Test.name })
    testId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Question.name })
    questionId: mongoose.Schema.Types.ObjectId;
}

export const TestQuestionsLinkSchema = SchemaFactory.createForClass(TestQuestionsLink);
export type TestQuestionsLinkDocument = HydratedDocument<TestQuestionLink>;