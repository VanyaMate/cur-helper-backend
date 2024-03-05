import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import {
    QuestionToTestDocument,
} from '@/db/mongoose/question-to-test/question-to-test.model';
import {
    QuestionToThemeDocument,
} from '@/db/mongoose/question-to-theme/question-to-theme.model';
import { Complexity } from '@vanyamate/cur-helper-types';


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

    tests?: QuestionToTestDocument[];
    themes?: QuestionToThemeDocument[];
    answers?: QuestionAnswerDocument[];
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
    localField  : '_id',
    foreignField: 'questionId',
    justOne     : false,
});