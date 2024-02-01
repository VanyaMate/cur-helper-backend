import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Complexity } from '@/db/mongoose/enums';


/**
 * TODO: Проверить как это будет работать
 */
@Schema()
export class QuestionAnswerModel {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, default: '' })
    description: string;

    @Prop({ type: Boolean, required: true })
    correct: boolean;
}

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

    @Prop({ type: [ QuestionAnswerModel ], default: [] })
    answers: QuestionAnswerModel[];
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