import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TestDocument, TestModel } from '@/db/mongoose/test/test.model';
import { QuestionDocument, QuestionModel } from '@/db/mongoose/question/question.model';


@Schema({
    toJSON  : {
        virtuals: true,
    },
})
export class QuestionToTestModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TestModel' })
    testId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionModel' })
    questionId: mongoose.Schema.Types.ObjectId;

    test?: TestDocument;
    question?: QuestionDocument;
}

export const QuestionToTestSchema = SchemaFactory.createForClass(QuestionToTestModel);
export type QuestionToTestDocument = HydratedDocument<QuestionToTestModel>;

QuestionToTestSchema.virtual('test', {
    ref         : 'TestModel',
    localField  : 'testId',
    foreignField: '_id',
    justOne     : true,
});

QuestionToTestSchema.virtual('question', {
    ref         : 'QuestionModel',
    localField  : 'questionId',
    foreignField: '_id',
    justOne     : true,
});