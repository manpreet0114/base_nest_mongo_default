"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const dto = require("./dto/index");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
let AdminController = exports.AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async login(dto) {
        try {
            let response = await this.adminService.login(dto);
            return { message: `Login Successfully`, data: response };
        }
        catch (err) {
            throw err;
        }
    }
    async profile(req) {
        try {
            let response = await this.adminService.getProfile(req);
            return response;
        }
        catch (err) {
            throw err;
        }
    }
    async editProfile(req, dto) {
        try {
            let response = await this.adminService.editProfile(req, dto);
            return { message: `Edit Successfully`, data: response };
        }
        catch (err) {
            throw err;
        }
    }
    async logout(req) {
        try {
            let response = await this.adminService.logout(req);
            return { message: response };
        }
        catch (err) {
            throw err;
        }
    }
    async password(req, dto) {
        try {
            let response = await this.adminService.changePassword(req, dto);
            return { message: response };
        }
        catch (err) {
            throw err;
        }
    }
    async staff(req, dto) {
        try {
            let response = await this.adminService.addStaff(req, dto);
            return { message: `Staff Added Success`, data: response };
        }
        catch (err) {
            throw err;
        }
    }
    async getStaffList(query) {
        try {
            console.log("GET STAFF LIST query -----------", query);
            let response = await this.adminService.getStaffList(query);
            return response;
        }
        catch (err) {
            throw err;
        }
    }
    async editStaff(id, dto) {
        try {
            let response = await this.adminService.editStaff(id, dto);
            return { message: `Staff Edit Successfully`, data: response };
        }
        catch (err) {
            throw err;
        }
    }
    async deleteStaff(id) {
        try {
            console.log("id ", id);
            let response = await this.adminService.deleteStaff(id);
            return { message: response };
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.AdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)("access_token"),
    (0, common_1.Get)("/profile"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.AdminData]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "profile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)("access_token"),
    (0, common_1.Put)("/profile"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.AdminData, dto.EditProfile]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "editProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)("access_token"),
    (0, common_1.Put)("/logout"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.AdminData]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)("access_token"),
    (0, common_1.Put)("/change/password"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.AdminData, dto.ChangePassword]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "password", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)("access_token"),
    (0, common_1.Post)("/staff"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.AdminData, dto.AddStaff]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "staff", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)("access_token"),
    (0, common_1.Get)("/staff/list"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto.StaffList]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStaffList", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)("access_token"),
    (0, common_1.Put)("/staff/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto.EditStaff]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "editStaff", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)("access_token"),
    (0, common_1.Delete)("/staff/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteStaff", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)("Admin"),
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map