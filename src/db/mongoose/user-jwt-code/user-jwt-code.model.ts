import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


@Schema()
export class UserJwtCodeModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String })
    jwtCode: string;
}

export const UserJwtCodeSchema = SchemaFactory.createForClass(UserJwtCodeModel);
export type UserJwtCodeDocument = HydratedDocument<UserJwtCodeModel>;