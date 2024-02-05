import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


@Schema()
export class RoleModel {
    @Prop({ type: String })
    title: string;

    @Prop({ type: Number })
    rules: number;
}

export const RoleSchema = SchemaFactory.createForClass(RoleModel);
export type RoleDocument = HydratedDocument<RoleModel>;