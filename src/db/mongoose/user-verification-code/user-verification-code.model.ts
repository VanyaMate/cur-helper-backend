import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


@Schema()
export class UserVerificationCodeModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String, required: true })
    code: string;
}

export const UserVerificationCodeSchema = SchemaFactory.createForClass(UserVerificationCodeModel);
export type UserVerificationCodeDocument = HydratedDocument<UserVerificationCodeModel>;