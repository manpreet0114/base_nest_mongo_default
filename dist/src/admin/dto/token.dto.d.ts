import { Types } from "mongoose";
export declare class IToken {
    _id: Types.ObjectId;
    email?: string;
    scope: string;
    _doc?: any;
    token_gen_at: Number;
}
export declare class GenerateToken {
    user_id: Types.ObjectId;
    access_token: string;
    fcm_token: string;
    token_gen_at: Number;
}
export declare class GetById {
    id: string;
}
