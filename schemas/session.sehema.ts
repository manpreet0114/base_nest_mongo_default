import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument , Types} from "mongoose";
import { UserType} from '../utils';
import { Admin } from "./admin.schema";
import { User } from "./user.schema";
import moment from "moment";

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {

    @Prop({ default: 'USER', enum: UserType })
    type: string;

    @Prop({type: Types.ObjectId, ref:'admin',required: false})
    admin_id: Types.ObjectId = null

    @Prop({type: Types.ObjectId, ref:'user',required: false})
    user_id: Types.ObjectId = null

    @Prop()
    access_token:string = null; 

    @Prop()
    fcm_token:string = null;

    @Prop()
    token_gen_at:number = null;

    @Prop()
    created_at:number = moment().utc().valueOf();
}

export const SessionSchema = SchemaFactory.createForClass(Session);  