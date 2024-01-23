import { Prop, Schema } from '@nestjs/mongoose';
import { Answer } from '../../../answer/implementations/mongo/mongo-answer.model';
import * as mongoose from 'mongoose';
import { Theme } from '../../../theme/implementations/mongo/mongo-theme.model';


@Schema()
export class Question {
    /**
     * Название вопроса
     * @type {string}
     */
    @Prop({ type: String })
    title: string;

    /**
     * Описание вопроса. Содержит в себе особый формат для генерации из него верстки.
     * @type {string}
     */
    @Prop({ type: String })
    description: string;

    /**
     * Количество баллов за правильный ответ
     * @type {number}
     */
    @Prop({ type: Number })
    complexity: number;

    /**
     * Возможные ответы на вопрос
     * @type {[Answer]}
     */
    @Prop({ type: mongoose.Schema.Types.ObjectId, schema: [ Answer ] })
    answers: Answer[];

    /**
     * Темы затронутые в этом вопросе
     * @type {Theme[]}
     */
    @Prop({ type: mongoose.Schema.Types.ObjectId, schema: [ Theme ] })
    themes: Theme[];
}