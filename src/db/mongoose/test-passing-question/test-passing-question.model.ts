import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


@Schema()
export class TestPassingQuestionModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'QuestionModel' })
    questionId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'QuestionAnswerModel' })
    answerId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Number, default: 0 })
    answerTime: number;

    @Prop({ type: Number, default: 0 })
    timeSpent: number;
}

export const TestPassingQuestionSchema = SchemaFactory.createForClass(TestPassingQuestionModel);
export type TestPassingQuestionDocument = HydratedDocument<TestPassingQuestionModel>;