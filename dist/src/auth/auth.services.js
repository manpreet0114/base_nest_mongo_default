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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const session_service_1 = require("../session/session.service");
let { ADMIN_SCOPE, USER_SCOPE } = process.env;
let admin_scope = ADMIN_SCOPE;
let user_scope = USER_SCOPE;
let AuthService = exports.AuthService = class AuthService {
    constructor(jwtservice, sessionservice) {
        this.jwtservice = jwtservice;
        this.sessionservice = sessionservice;
        this.createAdminToken = async (token_data) => {
            try {
                console.log("inside createAdminToken----", token_data);
                let access_token = await this.generateToken(token_data);
                let response = await this.saveSession(access_token, token_data, null);
                return response;
            }
            catch (error) {
                throw error;
            }
        };
        this.createUserToken = async (_id, body) => {
            try {
                let token_data = {
                    _id: _id,
                    scope: user_scope,
                    token_gen_at: +new Date(),
                };
                let access_token = await this.generateToken(token_data);
                let response = await this.saveSession(access_token, token_data, body);
                return response;
            }
            catch (error) {
                throw error;
            }
        };
        this.generateToken = async (token_data) => {
            try {
                let token = await this.jwtservice.signAsync(token_data);
                return token;
            }
            catch (err) {
                throw err;
            }
        };
        this.saveSession = async (access_token, token_data, body) => {
            try {
                const { token_gen_at, scope, _id } = token_data;
                let data = {
                    access_token: access_token,
                    token_gen_at: token_gen_at,
                };
                if (scope == "admin") {
                    data.type = "ADMIN";
                    data.admin_id = _id;
                    let query = { admin_id: _id };
                    await this.sessionservice.logoutSessionAdmin(query);
                }
                if (scope == "user") {
                    data.type = "USER";
                    data.user_id = _id;
                    data.fcm_token = body === null || body === void 0 ? void 0 : body.fcm_token;
                    data.device_type = body === null || body === void 0 ? void 0 : body.device_type;
                    let query = { user_id: _id };
                    await this.sessionservice.logoutSessionUser(query);
                }
                let save_data = await this.sessionservice.saveSession(data);
                return save_data;
            }
            catch (err) {
                throw err;
            }
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        session_service_1.SessionServices])
], AuthService);
//# sourceMappingURL=auth.services.js.map