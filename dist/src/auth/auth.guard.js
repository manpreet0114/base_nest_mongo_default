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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const admin_service_1 = require("../admin/admin.service");
const session_service_1 = require("../session/session.service");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let AuthGuard = exports.AuthGuard = class AuthGuard {
    constructor(adminservices, jwtservice, Sessionservices) {
        this.adminservices = adminservices;
        this.jwtservice = jwtservice;
        this.Sessionservices = Sessionservices;
        this.canActivate = async (context) => {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization;
            console.log("token", token);
            console.log("token", request.headers.authorization);
            if (!token) {
                throw new common_1.HttpException("token not provided", common_1.HttpStatus.UNAUTHORIZED);
            }
            else {
                try {
                    const token = request.headers.authorization.split(" ")[1];
                    console.log("token1.....", token);
                    const api_path = request.originalUrl;
                    console.log("token2.....", api_path);
                    let split_api_path = api_path.split("/");
                    let new_path = split_api_path[1];
                    console.log("new_PATH.....", new_path);
                    let projection = { _v: 0 };
                    let options = { lean: true };
                    const payload = await this.jwtservice.verifyAsync(token, {
                        secret: "admin_super_seckret_key",
                    });
                    console.log("payload", payload);
                    let { scope } = payload;
                    console.log("Scope ", scope);
                    if (scope == "admin" && new_path == "admin" && new_path != "post") {
                        let data = await this.verifyToken(payload);
                        if (data) {
                            let { _id } = payload;
                            let query = { _id: _id };
                            let fetch_admin = await this.adminservices.adminData(query, projection, options);
                            if (fetch_admin) {
                                let { roles, super_admin } = fetch_admin;
                                let split_api_path = api_path.split("/");
                                let new_path = split_api_path[2];
                                let type = new_path.toUpperCase();
                                console.log("type", type);
                                if (super_admin != true && type != "PROFILE") {
                                    let check_roles = roles.includes(type);
                                    if (check_roles != true) {
                                        throw new common_1.UnauthorizedException();
                                    }
                                }
                                request.admin_data = fetch_admin;
                                return request.admin_data;
                            }
                            else {
                                throw new common_1.HttpException("admin not found", common_1.HttpStatus.NOT_FOUND);
                            }
                        }
                        else {
                            throw new common_1.HttpException("admin not found", common_1.HttpStatus.NOT_FOUND);
                        }
                    }
                }
                catch (_a) {
                    throw new common_1.UnauthorizedException();
                }
            }
        };
        this.verifyToken = async (payload) => {
            try {
                console.log("paylod---", payload);
                let { scope } = payload;
                let query;
                if (scope == "admin") {
                    let { _id: admin_id } = payload;
                    query = {
                        admin_id: new mongoose_1.Types.ObjectId(admin_id),
                        access_token: { $ne: null },
                    };
                }
                if (scope == "user") {
                    let { _id: user_id } = payload;
                    query = {
                        user_id: new mongoose_1.Types.ObjectId(user_id),
                        access_token: { $ne: null },
                    };
                }
                let projection = { _v: 0 };
                let options = { lean: true };
                console.log("query", query);
                let fcm_data = await this.Sessionservices.getSingleSession(query, projection, options);
                console.log("fcm data", fcm_data);
                if (fcm_data) {
                    return fcm_data;
                }
                else {
                    throw new common_1.HttpException("Sessions Not Found", common_1.HttpStatus.NOT_FOUND);
                }
            }
            catch (error) {
                throw error;
            }
        };
    }
};
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        jwt_1.JwtService,
        session_service_1.SessionServices])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map