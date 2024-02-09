import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ThemeDocument, ThemeModel } from '@/db/mongoose/theme/theme.model';
import { QuestionModel } from '@/db/mongoose/question/question.model';
import { HydratedDocument } from 'mongoose';
import {
    QuestionToTestDocument,
    QuestionToTestModel,
} from '@/db/mongoose/question-to-test/question-to-test.model';
import { TestPassingDocument } from '@/db/mongoose/test-passing/test-passing.model';


@Schema({
    toJSON  : {
        virtuals: true,
    },
    virtuals: true,
    toObject: {
        virtuals: true,
    },
})
export class TestModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ThemeModel' })
    themeId: mongoose.Schema.Types.ObjectId | null;

    @Prop({ type: Boolean, default: false })
    enabled: boolean;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, default: '' })
    description: string;

    @Prop({ type: Number, default: 0 })
    timeToPass: number;

    @Prop({ type: Number, default: 0 })
    questionsAmount: number;

    @Prop({ type: Number, default: 0 })
    unsatisfactoryScore: number;

    @Prop({ type: Number, default: 0 })
    satisfactoryScore: number;

    @Prop({ type: Number, default: 0 })
    perfectScore: number;

    questions?: QuestionToTestDocument[];
    theme?: ThemeDocument;
}

export const TestSchema = SchemaFactory.createForClass(TestModel);
export type TestDocument = HydratedDocument<TestModel>;

TestSchema.virtual('questions', {
    ref         : 'QuestionToTestModel',
    localField  : '_id',
    foreignField: 'testId',
    justOne     : false,
});

TestSchema.virtual('theme', {
    ref         : 'ThemeModel',
    localField  : 'themeId',
    foreignField: '_id',
    justOne     : false,
});