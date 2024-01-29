import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import { Complexity } from '@/db/mongoose/enums';


export class QuestionAnswer {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, default: '' })
    description: string;

    @Prop({ type: Boolean, required: true })
    correct: boolean;
}

@Schema()
export class QuestionModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ThemeModel.name })
    themeId: string;

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

    @Prop({ type: [ QuestionAnswer ], default: [] })
    answers: QuestionAnswer[];
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionModel);
export type QuestionDocument = HydratedDocument<QuestionModel>;