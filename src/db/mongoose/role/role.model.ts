import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


@Schema()
export class RoleModel {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: Number, required: true })
    rights: number;
}

export const RoleSchema = SchemaFactory.createForClass(RoleModel);
export type RoleDocument = HydratedDocument<RoleModel>;