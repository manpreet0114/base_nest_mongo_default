import { ModelService } from "src/model/model.service";
export declare class SessionServices {
    private model;
    constructor(model: ModelService);
    saveSession: (data: any) => Promise<any>;
    getSingleSession: (query: any, projection: any, options: any) => Promise<any>;
    getSession: (query: any, projection: any, options: any) => Promise<any[]>;
    logoutSessionAdmin: (query: any) => Promise<{
        message: string;
    }>;
    logoutSessionUser: (query: any) => Promise<{
        message: string;
    }>;
}
