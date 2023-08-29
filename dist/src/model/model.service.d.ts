import { Model } from "mongoose";
export declare class ModelService {
    admin: Model<any>;
    user: Model<any>;
    session: Model<any>;
    constructor(admin: Model<any>, user: Model<any>, session: Model<any>);
}
