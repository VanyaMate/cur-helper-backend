import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
    QuestionToThemeModel,
} from '@/db/mongoose/question-to-theme/question-to-theme.model';
import { TestModel } from '@/db/mongoose/test/test.model';


@Schema({
    toJSON  : {
        virtuals: true,
    },
    virtuals: true,
    toObject: {
        virtuals: true,
    },
})
export class ThemeModel {
    @Prop({ type: String, required: true, unique: true })
    publicId: string;

    @Prop({ type: Boolean, default: false })
    enabled: boolean;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, default: '' })
    description: string;

    @Prop({ type: String, default: '' })
    additional: string;

    @Prop({ type: String, default: '' })
    body: string;

    @Prop({ type: String, default: '' })
    url: string;

    questions?: QuestionToThemeModel[];
    tests?: TestModel[];
}

export const ThemeSchema = SchemaFactory.createForClass(ThemeModel);
export type ThemeDocument = HydratedDocument<ThemeModel>;

ThemeSchema.virtual('questions', {
    ref         : 'QuestionToThemeModel',
    localField  : '_id',
    foreignField: 'themeId',
    justOne     : false,
});

ThemeSchema.virtual('tests', {
    ref         : 'TestModel',
    localField  : '_id',
    foreignField: 'themeId',
    justOne     : false,
});