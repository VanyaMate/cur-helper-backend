import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {
    QuestionToTestSchema,
} from '@/db/mongoose/question-to-test/question-to-test.model';
import { QuestionModel } from '@/db/mongoose/question/question.model';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';


@Schema({
    toJSON: {
        virtuals: true,
    },
})
export class QuestionToThemeModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ThemeModel' })
    themeId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionModel' })
    questionId: mongoose.Schema.Types.ObjectId;

    theme?: ThemeModel;
    question?: QuestionModel;
}

export const QuestionToThemeSchema = SchemaFactory.createForClass(QuestionToThemeModel);
export type QuestionToThemeDocument = HydratedDocument<QuestionToThemeModel>;

QuestionToThemeSchema.virtual('theme', {
    ref         : 'ThemeModel',
    localField  : 'themeId',
    foreignField: '_id',
    justOne     : true,
});

QuestionToThemeSchema.virtual('question', {
    ref         : 'QuestionModel',
    localField  : 'questionId',
    foreignField: '_id',
    justOne     : true,
});