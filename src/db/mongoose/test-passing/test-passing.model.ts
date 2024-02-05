import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Status } from '@/domain/enums';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { UserDocument } from '@/db/mongoose/user/user.model';
import { raw } from '@nestjs/mongoose';
import { QuestionDocument, QuestionModel } from '@/db/mongoose/question/question.model';
import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';


@Schema()
export class TestPassingModel {
    @Prop({ type: Boolean, default: false })
    isPrivate: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'UserModel', required: true })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'TestModel', required: true })
    testId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, name: 'QuestionModel' } ] })
    questionsIds: mongoose.Schema.Types.ObjectId[];

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
    questions?: TestPassingQuestionDocument[];
}

export const TestPassingSchema = SchemaFactory.createForClass(TestPassingModel);
export type TestPassingDocument = HydratedDocument<TestPassingModel>;

TestPassingSchema.virtual('questions', {
    ref         : 'TestPassingQuestionModel',
    localField  : 'questionsIds',
    foreignField: '_id',
    justOne     : false,
});

TestPassingSchema.virtual('test', {
    ref         : 'TestModel',
    localField  : 'testId',
    foreignField: '_id',
    justOne     : true,
});

TestPassingSchema.virtual('user', {
    ref         : 'UserModel',
    localField  : 'userId',
    foreignField: '_id',
    justOne     : true,
});