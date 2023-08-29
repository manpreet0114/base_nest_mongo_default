import { AdminDto } from "./dto";
import * as dto from "./dto/index";
import { AuthService } from "src/auth/auth.services";
import { ModelService } from "src/model/model.service";
export declare class AdminService {
    private readonly auth;
    private model;
    constructor(auth: AuthService, model: ModelService);
    login: (dto: AdminDto) => Promise<any>;
    loginExisitngAdmin: (admin: AdminDto, password: string) => Promise<any>;
    createNewAdmin: (dto: AdminDto) => Promise<any>;
    adminData: (query: any, projection: any, options: any) => Promise<any>;
    getProfile: (req: dto.AdminData) => Promise<any>;
    editProfile: (req: dto.AdminData, body: dto.EditProfile) => Promise<any>;
    logout: (req: dto.AdminData) => Promise<string>;
    changePassword: (req: dto.AdminData, body: dto.ChangePassword) => Promise<string>;
    addStaff: (req: dto.AdminData, body: dto.AddStaff) => Promise<any>;
    getStaffList: (req_query: dto.StaffList) => Promise<{
        count: number;
        data: any[];
    }>;
    editStaff: (_id: string, body: dto.EditStaff) => Promise<any>;
    deleteStaff: (id: string) => Promise<string>;
}
