import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


@Schema()
export class ThemeModel {
    @Prop({ type: String, required: true, unique: true })
    id: string;

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
}

export const ThemeSchema = SchemaFactory.createForClass(ThemeModel);
export type ThemeDocument = HydratedDocument<ThemeModel>;