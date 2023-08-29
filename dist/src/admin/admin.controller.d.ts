import { AdminService } from "./admin.service";
import * as dto from "./dto/index";
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    login(dto: dto.AdminDto): Promise<{
        message: string;
        data: any;
    }>;
    profile(req: dto.AdminData): Promise<any>;
    editProfile(req: dto.AdminData, dto: dto.EditProfile): Promise<{
        message: string;
        data: any;
    }>;
    logout(req: dto.AdminData): Promise<{
        message: string;
    }>;
    password(req: dto.AdminData, dto: dto.ChangePassword): Promise<{
        message: string;
    }>;
    staff(req: dto.AdminData, dto: dto.AddStaff): Promise<{
        message: string;
        data: any;
    }>;
    getStaffList(query: dto.StaffList): Promise<{
        count: number;
        data: any[];
    }>;
    editStaff(id: string, dto: dto.EditStaff): Promise<{
        message: string;
        data: any;
    }>;
    deleteStaff(id: string): Promise<{
        message: string;
    }>;
}
