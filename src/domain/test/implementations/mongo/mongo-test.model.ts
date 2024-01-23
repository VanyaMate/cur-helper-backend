import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Question } from '../../../questions/implementations/mongo/mongo-question.model';
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

export const TestSchema = SchemaFactory.createForClass(Test);
export type TestDocument = HydratedDocument<Test>;
