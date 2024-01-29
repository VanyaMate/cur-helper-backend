import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TestModel } from '@/db/mongoose/test/test.model';
import { QuestionModel } from '@/db/mongoose/question/question.model';
import { Status } from '@/db/mongoose/enums';


export class TestPassingQuestion {
    @Prop({ type: mongoose.Schema.Types.ObjectId, name: QuestionModel.name })
    questionId: string;

    @Prop({ type: String, default: '' })
    answerId: string;

    @Prop({ type: Number, default: '' })
    answerTime: number;

    @Prop({ type: Number, default: 0 })
    timeSpent: number;
}

@Schema()
export class TestPassingModel {
    @Prop({ type: Boolean, default: false })
    isPrivate: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'user', required: true })
    userId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: TestModel.name, required: true })
    testId: string;

    @Prop({ type: [ TestPassingQuestion ], default: [] })
    questions: TestPassingQuestion[];

    @Prop({ type: Status, default: Status.PROCESS })
    status: Status;

    @Prop({ type: Number, default: Date.now() })
    startTime: number;

    @Prop({ type: Number, default: -1 })
    finishTime: number;

    @Prop({ type: Number, default: -1 })
    rightAnswers: number;
}