import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


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
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);
export type ThemeDocument = HydratedDocument<Theme>;