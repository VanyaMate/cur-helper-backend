import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Test } from '../test/test.model';
import { Type } from 'class-transformer';


@Schema({
    toJSON  : { virtuals: true },
    toObject: { virtuals: true },
})
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
     * Описание для темы
     * @type {string}
     */
    @Prop({ type: String, default: '' })
    description: string;

    /**
     * Помарка для темы
     * @type {string}
     */
    @Prop({ type: String, default: '' })
    additional: string;

    /**
     * Специальный формат для описания темы
     * @type {string}
     */
    @Prop({ type: String, default: '' })
    body: string;

    /**
     * URL для случаев когда это внешний источник
     * @type {string}
     */
    @Prop({ type: String, default: '' })
    url: string;

    /**
     * ID родительской темы
     * @type {mongoose.Schema.Types.ObjectId}
     */
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Theme.name, default: null })
    @Type(() => Theme)
    parentId: string;

    /**
     * Родительская тема
     * @type {Theme}
     */
    @Type(() => Theme)
    parent: Theme;

    /**
     * Дочерние темы
     * @type {Theme[]}
     */
    @Type(() => Theme)
    children: Theme[];

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
export type ThemeDocument = HydratedDocument<Theme>;

ThemeSchema.virtual('children', {
    ref         : Theme.name,
    localField  : '_id',
    foreignField: 'parentId',
});

ThemeSchema.virtual('parent', {
    ref         : Theme.name,
    localField  : 'parentId',
    foreignField: '_id',
});