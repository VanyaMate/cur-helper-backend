import { Prop, Schema } from '@nestjs/mongoose';


@Schema()
export class Answer {
    /**
     * Заголовок (вариант ответа)
     * @type {string}
     */
    @Prop({ title: String })
    title: string;

    /**
     * Описание почему ответ верный/не верный
     * @type {string}
     */
    @Prop({ title: String })
    description: string;

    /**
     * Является ли ответ правильным или не правильным
     * @type {boolean}
     */
    @Prop({ title: Boolean })
    rightAnswer: boolean;
}