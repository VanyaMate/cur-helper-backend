import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


@Schema()
export class QuestionToThemeModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ThemeModel' })
    testId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionModel' })
    questionId: mongoose.Schema.Types.ObjectId;
}

export const QuestionToThemeSchema = SchemaFactory.createForClass(QuestionToThemeModel);
export type QuestionToThemeDocument = HydratedDocument<QuestionToThemeModel>;