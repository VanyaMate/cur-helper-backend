import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Complexity } from '@/domain/enums';
import { QuestionAnswerModel } from '@/db/mongoose/question-answer/question-answer.model';
import {
    QuestionToTestModel,
} from '@/db/mongoose/question-to-test/question-to-test.model';
import {
    QuestionToThemeModel,
} from '@/db/mongoose/question-to-theme/question-to-theme.model';


@Schema({
    toJSON: {
        virtuals: true,
    },
})
export class QuestionModel {
    @Prop({ type: Boolean, default: false })
    enabled: boolean;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, default: '' })
    description: string;

    @Prop({ type: String, default: '' })
    body: string;

    @Prop({ type: String, default: Complexity.EASY })
    complexity: Complexity;

    @Prop({ type: Number, default: 0 })
    points: number;

    @Prop({
        type   : [ { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionAnswerModel' } ],
        default: [],
    })
    answersIds: mongoose.Schema.Types.ObjectId[];

    tests?: QuestionToTestModel[];
    themes?: QuestionToThemeModel[];
    answers?: QuestionAnswerModel[];
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionModel);
export type QuestionDocument = HydratedDocument<QuestionModel>;

QuestionSchema.virtual('tests', {
    ref         : 'QuestionToTestModel',
    localField  : '_id',
    foreignField: 'questionId',
    justOne     : false,
});

QuestionSchema.virtual('themes', {
    ref         : 'QuestionToThemeModel',
    localField  : '_id',
    foreignField: 'questionId',
    justOne     : false,
});

QuestionSchema.virtual('answers', {
    ref         : 'QuestionAnswerModel',
    localField  : 'answersIds',
    foreignField: '_id',
    justOne     : false,
});