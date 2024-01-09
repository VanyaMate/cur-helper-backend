import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Test } from '../test/test.model';


@Schema()
export class Theme {
    /**
     * ручной ID для поиска по темам по типу 1-1 или 1 или 3-2-5
     * @type {string}
     */
    @Prop({ type: String, required: true })
    id: string;

    /**
     * Заголовок темы
     * @type {string}
     */
    @Prop({ type: String, required: true })
    title: string;

    /**
     * Специальный формат для описания темы
     * @type {string}
     */
    @Prop({ type: String, default: '' })
    description: string;

    /**
     * URL для случаев когда это внешний источник
     * @type {string}
     */
    @Prop({ type: String, default: '' })
    url: string;

    /**
     * Родительская тема
     * @type {Theme}
     */
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Theme.name, default: null })
    parent: Theme;

    /**
     * Тесты по этой теме
     * @type {Test[]}
     */
    @Prop({
        type: [ { type: mongoose.Schema.Types.ObjectId, ref: Test.name } ], default: [],
    })
    tests: Test[];
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);

// TODO: Continue
ThemeSchema.virtual('children', {
    ref         : Theme.name,
    localField  : '_id',
    foreignField: 'parent',
    justOne     : false,
});
