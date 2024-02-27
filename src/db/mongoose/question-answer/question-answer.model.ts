import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


@Schema()
export class QuestionAnswerModel {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: Boolean, default: false })
    enabled: boolean;

    @Prop({ type: String, default: '' })
    description: string;

    @Prop({ type: Boolean, required: true })
    correct: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'QuestionModel' })
    questionId: mongoose.Schema.Types.ObjectId;
}

export const QuestionAnswerSchema = SchemaFactory.createForClass(QuestionAnswerModel);
export type QuestionAnswerDocument = HydratedDocument<QuestionAnswerModel>