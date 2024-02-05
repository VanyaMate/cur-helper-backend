import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Status } from '@/domain/enums';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { UserDocument } from '@/db/mongoose/user/user.model';
import { raw } from '@nestjs/mongoose';


export class TestPassingQuestionModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'QuestionModel' })
    questionId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'QuestionAnswerModel' })
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

    @Prop(raw([ TestPassingQuestionModel ]))
    questions: TestPassingQuestionModel[];

    @Prop({ type: String, default: Status.PROCESS })
    status: Status;

    @Prop({ type: Number, default: Date.now() })
    startTime: number;

    @Prop({ type: Number, default: -1 })
    finishTime: number;

    @Prop({ type: Number, default: -1 })
    rightAnswers: number;

    user?: UserDocument;
    test?: TestDocument;
}

export const TestPassingSchema = SchemaFactory.createForClass(TestPassingModel);
export type TestPassingDocument = HydratedDocument<TestPassingModel>;