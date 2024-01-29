import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


@Schema()
export class QuestionToTestModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TestModel' })
    testId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionModel' })
    questionId: string;
}

export const QuestionToTestSchema = SchemaFactory.createForClass(QuestionToTestModel);
export type QuestionToTestDocument = HydratedDocument<QuestionToTestModel>;