import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


@Schema()
export class TestRunningModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TestPassingModel' })
    testPassingId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Number })
    finishTime: number;
}

export const TestRunningSchema = SchemaFactory.createForClass(TestRunningModel);
export type TestRunningDocument = HydratedDocument<TestRunningModel>;