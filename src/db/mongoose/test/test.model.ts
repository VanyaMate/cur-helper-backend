import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import { QuestionModel } from '@/db/mongoose/question/question.model';
import { HydratedDocument } from 'mongoose';


@Schema()
export class TestModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ThemeModel.name })
    themeId: string | null;

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

    @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: QuestionModel.name } ] })
    questionsIds: string[];
}

export const TestSchame = SchemaFactory.createForClass(TestModel);
export type TestDocument = HydratedDocument<TestModel>;