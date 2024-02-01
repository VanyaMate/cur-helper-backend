import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TestModel } from '@/db/mongoose/test/test.model';
import { QuestionModel } from '@/db/mongoose/question/question.model';
import { Status } from '@/domain/enums';


export class TestPassingQuestion {
    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'QuestionModel' })
    questionId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'AnswerModel' })
    answerId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Number, default: 0 })
    answerTime: number;

    @Prop({ type: Number, default: 0 })
    timeSpent: number;
}

@Schema()
export class TestPassingModel {
    @Prop({ type: Boolean, default: false })
    isPrivate: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'user', required: true })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'TestModel', required: true })
    testId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [ TestPassingQuestion ], default: [] })
    questionsIds: TestPassingQuestion[];

    @Prop({ type: Status, default: Status.PROCESS })
    status: Status;

    @Prop({ type: Number, default: Date.now() })
    startTime: number;

    @Prop({ type: Number, default: -1 })
    finishTime: number;

    @Prop({ type: Number, default: -1 })
    rightAnswers: number;
}