import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Question } from '../question/question.model';


@Schema()
export class Test {
    /**
     * Название теста
     * @type {string}
     */
    @Prop({ type: String })
    title: string;

    /**
     * Описание теста
     * @type {string}
     */
    @Prop({ type: String })
    description: string;

    /**
     * Количество вопросов которые нужно сгенерировать (выбрать) для этого теста
     * @type {number}
     */
    @Prop({ type: mongoose.Schema.Types.ObjectId, schema: [ Question ] })
    questions: Question[];
}