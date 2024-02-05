import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { RoleDocument } from '@/db/mongoose/role/role.model';


@Schema({
    toJSON: {
        virtuals: true,
    },
})
export class UserModel {
    @Prop({ type: String, required: true, unique: true })
    login: string;

    @Prop({ type: String })
    avatarUrl: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String })
    firstName: string;

    @Prop({ type: String })
    lastName: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type: Boolean })
    verified: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'RoleModel' })
    roleId: mongoose.Schema.Types.ObjectId;

    role?: RoleDocument;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
export type UserDocument = HydratedDocument<UserModel>;

UserSchema.virtual('role', {
    ref         : 'RoleModel',
    localField  : 'roleId',
    foreignField: '_id',
    justOne     : true,
});