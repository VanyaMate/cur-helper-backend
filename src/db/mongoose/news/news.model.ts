import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


@Schema({
    toJSON: {
        virtuals: true,
    },
})
export class NewsModel {
    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: String })
    body: string;

    @Prop({ type: String })
    preview: string;

    @Prop({ type: String })
    date: string;

    @Prop({ type: String })
    key: string;
}

export const NewsSchema = SchemaFactory.createForClass(NewsModel);
export type NewsDocument = HydratedDocument<NewsModel>;