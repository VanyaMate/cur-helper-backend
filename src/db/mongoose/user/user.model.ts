import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { RoleDocument } from '@/db/mongoose/role/role.model';
import {
    TestPassingDocument,
} from '@/db/mongoose/test-passing/test-passing.model';


@Schema({
    toJSON  : {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
})
export class UserModel {
    @Prop({ type: String, required: true, unique: true })
    login: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, default: '' })
    avatarUrl: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, default: '' })
    firstName: string;

    @Prop({ type: String, default: '' })
    lastName: string;

    @Prop({
        type   : mongoose.Schema.Types.ObjectId,
        ref    : 'RoleModel',
        default: null,
    })
    roleId: mongoose.Schema.Types.ObjectId | null;

    @Prop({ type: Boolean, default: false })
    verified: boolean;

    role?: RoleDocument;
    tests?: TestPassingDocument[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
export type UserDocument = HydratedDocument<UserModel>;

UserSchema.virtual('role', {
    ref         : 'RoleModel',
    localField  : 'roleId',
    foreignField: '_id',
    justOne     : true,
});

UserSchema.virtual('tests', {
    ref         : 'TestPassingModel',
    localField  : '_id',
    foreignField: 'userId',
    justOne     : false,
});