import { Types } from "mongoose";
export declare class AdminDto {
    _id?: Types.ObjectId;
    email: string;
    password: string;
    token?: string;
    _doc?: any;
    select?: any;
}
export declare class AdminData {
    admin_data: any;
}
export declare class EditProfile {
    name: string;
    image: string;
    country_code: string;
    phone_no: string;
    roles: string;
}
export declare class ChangePassword {
    old_password: string;
    new_password: string;
}
