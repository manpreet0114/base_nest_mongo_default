import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { StaffRoles } from "utils";
import moment from "moment";

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
    @Prop()
    @IsEmail()
    email: string;

    @Prop()
    password: string;

    @Prop({ isRequired: false })
    name: string;

    @Prop({ isRequired: false })
    image: string;


    @Prop({ default: 0 })
    phone_no : number;

    @Prop({ default: null })
    country_code : string;
    
    @Prop({default:false})
    super_admin: boolean = false;

    @Prop({ type: [{ type: String, enum: Object.values(StaffRoles) }], isRequired: true })
    roles?: (string | null)[];

    @Prop({ default: false })
    is_blocked: boolean = false;

    @Prop({ default: false })
    is_deleted: boolean = false;

    @Prop()
    updated_at: number = 0;

    @Prop()
    created_at: number = moment().utc().valueOf();
}

export const AdminSchema = SchemaFactory.createForClass(Admin);