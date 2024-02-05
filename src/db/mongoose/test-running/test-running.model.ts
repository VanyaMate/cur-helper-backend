import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TestPassingDocument } from '@/db/mongoose/test-passing/test-passing.model';


@Schema()
export class TestRunningModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TestPassingModel' })
    testPassingId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TestModel' })
    testId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Number })
    finishTime: number;

    testPassing?: TestPassingDocument;
}

export const TestRunningSchema = SchemaFactory.createForClass(TestRunningModel);
export type TestRunningDocument = HydratedDocument<TestRunningModel>;

TestRunningSchema.virtual('testPassing', {
    ref         : 'TestPassingModel',
    localField  : 'testPassingId',
    foreignField: '_id',
    justOne     : true,
});