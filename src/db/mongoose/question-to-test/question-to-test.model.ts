import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TestModel } from '@/db/mongoose/test/test.model';
import { QuestionModel } from '@/db/mongoose/question/question.model';


@Schema()
export class QuestionToTestModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: TestModel.name })
    testId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: QuestionModel.name })
    questionId: string;
}