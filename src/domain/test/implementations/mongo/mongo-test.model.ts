import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Question } from '@/domain/question/implementations/mongo/mongo-question.model';
import { Type } from 'class-transformer';
import { HydratedDocument } from 'mongoose';


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
     * Вопросы подключенные к этому тесту
     * @type {mongoose.Schema.Types.ObjectId[]}
     */
    @Prop({
        type   : [ { type: mongoose.Schema.Types.ObjectId, ref: Question.name } ],
        default: [],
    })
    @Type(() => Question)
    questions: Question[];

    /**
     * То что ниже - можно вынести в отдельную модель в будущем
     * И генерировать тесты основываясь на этих моделях, чтобы генерировать разные тесты разных размеров
     */

    /**
     * Время на прохождение теста
     * @type {number}
     */
    @Prop({ type: Number })
    timeToPass: number;

    /**
     * Количество вопросов для генерации теста
     * @type {number}
     */
    @Prop({ type: Number })
    questionsAmount: number;
}

export const TestSchema = SchemaFactory.createForClass(Test);
export type TestDocument = HydratedDocument<Test>;
