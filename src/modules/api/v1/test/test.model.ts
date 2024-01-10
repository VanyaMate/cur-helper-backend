import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Question } from '../question/question.model';
import { Type } from 'class-transformer';


@Schema()
export class Test {
    /**
     * Название теста
     * @type {string}
     */
    @Prop({ type: String, required: true })
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
    @Prop({
        type   : [ { type: mongoose.Schema.Types.ObjectId, ref: Question.name } ],
        default: [],
    })
    @Type(() => Question)
    questions: Question[];
}