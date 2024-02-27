import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { UserDocument } from '@/db/mongoose/user/user.model';
import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import { TestPassingResult, TestPassingState } from '@vanyamate/cur-helper-types';


@Schema()
export class TestPassingModel {
    @Prop({ type: Boolean, default: false })
    isPrivate: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'UserModel', required: true })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, name: 'TestModel', required: true })
    testId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, name: 'TestPassingQuestionModel' } ] })
    questionsIds: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: String, default: 'process' as TestPassingState })
    status: TestPassingState;

    @Prop({ type: String, default: 'no-result' as TestPassingResult })
    result: TestPassingResult;

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