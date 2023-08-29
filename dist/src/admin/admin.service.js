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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const argon = require("argon2");
const auth_services_1 = require("../auth/auth.services");
const model_service_1 = require("../model/model.service");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let { ADMIN_SCOPE, USER_SCOPE } = process.env;
let admin_scope = ADMIN_SCOPE;
let user_scope = USER_SCOPE;
let projection = { ___v: 0 };
let options = { lean: true };
let options_new = { new: true };
let AdminService = exports.AdminService = class AdminService {
    constructor(auth, model) {
        this.auth = auth;
        this.model = model;
        this.login = async (dto) => {
            try {
                let { email, password } = dto;
                let admin = await this.model.admin.find({ email: email });
                if (admin.length) {
                    return await this.loginExisitngAdmin(admin[0], password);
                }
                else {
                    return await this.createNewAdmin(dto);
                }
            }
            catch (err) {
                throw err;
            }
        };
        this.loginExisitngAdmin = async (admin, password) => {
            try {
                let { _id, password: hash } = admin;
                let decode = await argon.verify(hash, password);
                console.log(`🚀 decode:`, decode);
                if (decode != true) {
                    throw new common_1.BadRequestException(`Incorrect Password`);
                }
                else {
                    let query = { _id: _id };
                    let update = { updated_at: +new Date() };
                    let options = {
                        projection: {
                            email: true,
                            updated_at: true,
                            created_at: true,
                        },
                        new: true,
                    };
                    let update_admin = await this.model.admin.findOneAndUpdate(query, update, options);
                    let token_payload = {
                        _id: _id,
                        email: admin.email,
                        scope: admin_scope,
                        token_gen_at: +new Date(),
                    };
                    let token = await this.auth.createAdminToken(token_payload);
                    update_admin._doc["token"] = token === null || token === void 0 ? void 0 : token.access_token;
                    return update_admin;
                }
            }
            catch (err) {
                throw err;
            }
        };
        this.createNewAdmin = async (dto) => {
            try {
                let { email, password } = dto;
                if (email.toLowerCase() != "admin@gmail.com") {
                    throw new common_1.BadRequestException(`This email address is not registered.`);
                }
                let hash = await argon.hash(password);
                let data_to_save = {
                    email: "admin@gmail.com",
                    password: hash,
                    super_admin: true,
                    created_at: +new Date(),
                };
                let create = await this.model.admin.create(data_to_save);
                let query = { _id: create._id };
                let projection = {
                    email: true,
                    updated_at: true,
                    created_at: true,
                };
                let find = await this.model.admin.findById(query, projection, options);
                let token_payload = {
                    _id: create._id,
                    email: email,
                    scope: admin_scope,
                    token_gen_at: +new Date(),
                };
                let token = await this.auth.createAdminToken(token_payload);
                find["token"] = token === null || token === void 0 ? void 0 : token.access_token;
                return find;
            }
            catch (err) {
                throw err;
            }
        };
        this.adminData = async (query, projection, options) => {
            try {
                let fetch_admin = await this.model.admin.findOne(query, projection, options);
                return fetch_admin;
            }
            catch (err) {
                throw err;
            }
        };
        this.getProfile = async (req) => {
            try {
                let { _id: user_id } = req.admin_data;
                let query = { _id: user_id };
                let projection = {
                    super_admin: 0,
                    is_blocked: 0,
                    is_deleted: 0,
                    password: 0,
                    __v: 0,
                };
                let response = await this.adminData(query, projection, options);
                return response;
            }
            catch (err) {
                throw err;
            }
        };
        this.editProfile = async (req, body) => {
            try {
                let { _id: user_id } = req.admin_data;
                let { name, image, country_code, phone_no, roles } = body;
                let query = { _id: user_id };
                let update = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name: name.toLocaleLowerCase().trim() })), (image && { image: image })), (country_code && { country_code: country_code })), (phone_no && { phone_no: phone_no })), (roles && { roles: roles }));
                await this.model.admin.findByIdAndUpdate(query, update, options_new);
                let projection = {
                    super_admin: 0,
                    is_blocked: 0,
                    is_deleted: 0,
                    password: 0,
                    __v: 0,
                };
                let response = await this.adminData(query, projection, options);
                return response;
            }
            catch (err) {
                throw err;
            }
        };
        this.logout = async (req) => {
            try {
                let { _id } = req.admin_data;
                await this.model.session.deleteMany({ admin_id: _id });
                return "Logged Out Successfully";
            }
            catch (err) {
                throw err;
            }
        };
        this.changePassword = async (req, body) => {
            try {
                let { _id } = req.admin_data;
                let { old_password, new_password } = body;
                let query = { _id: _id };
                let get_admin = await this.adminData(query, projection, options);
                if (get_admin) {
                    let { _id, password: hash } = get_admin;
                    let decrypted_password = await argon.verify(hash, old_password);
                    if (!decrypted_password) {
                        throw new common_1.BadRequestException(`Old Password Mismatch`);
                    }
                    else {
                        let hash_password = await argon.hash(new_password);
                        let update = { password: hash_password };
                        await this.model.admin.findByIdAndUpdate(query, update, options_new);
                    }
                }
                return "Password Changed Successfully";
            }
            catch (err) {
                throw new common_1.BadRequestException();
            }
        };
        this.addStaff = async (req, body) => {
            try {
                let { _id } = req.admin_data;
                let { name, image, roles, email, password: default_password, phone_no, country_code, } = body;
                let query = { email: email.toLowerCase() };
                let staff_members = await this.adminData(query, projection, options);
                if (!staff_members) {
                    let hash_password = await argon.hash(default_password);
                    let data_to_save = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name: name.toLocaleLowerCase().trim() })), (email && { email: email.toLocaleLowerCase().trim() })), (image && { image: image })), (country_code && { country_code: country_code })), (phone_no && { phone_no: phone_no })), (roles && {
                        roles: roles ? roles.map((role) => role.toUpperCase()) : [],
                    })), { password: hash_password, created_at: +new Date() });
                    let data = await this.model.admin.create(data_to_save);
                    let projection = {
                        password: 0,
                        __v: 0,
                    };
                    let response = await this.adminData({ _id: data._id }, projection, options);
                    return response;
                }
                else {
                    throw new common_1.HttpException("Email Already Exist", common_1.HttpStatus.BAD_REQUEST);
                }
            }
            catch (err) {
                throw err;
            }
        };
        this.getStaffList = async (req_query) => {
            try {
                let { search, pagination, limit } = req_query;
                console.log("req_query ", req_query);
                let query = { is_deleted: false, super_admin: false };
                let projection = {
                    name: 1,
                    email: 1,
                    roles: 1,
                    is_blocked: 1,
                    country_code: 1,
                    phone_no: 1,
                    profile_pic: 1,
                };
                let staff_data = await this.model.admin.find(query, projection, options);
                let count_data = await this.model.admin.count(query);
                let response = {
                    count: count_data,
                    data: staff_data,
                };
                return response;
            }
            catch (err) {
                throw err;
            }
        };
        this.editStaff = async (_id, body) => {
            try {
                let { name, image, roles, email, phone_no, country_code } = body;
                let query = { _id: new mongoose_1.Types.ObjectId(_id) };
                let update = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name: name.toLocaleLowerCase().trim() })), (email && { email: email.toLocaleLowerCase().trim() })), (image && { image: image })), (country_code && { country_code: country_code })), (phone_no && { phone_no: phone_no })), (roles && {
                    roles: roles ? roles.map((role) => role.toUpperCase()) : [],
                })), { updated_at: +new Date() });
                await this.model.admin.findByIdAndUpdate(query, update, options_new);
                let projection = {
                    password: 0,
                    __v: 0,
                };
                let response = await this.adminData(query, projection, options);
                return response;
            }
            catch (err) {
                throw err;
            }
        };
        this.deleteStaff = async (id) => {
            try {
                let query = { _id: new mongoose_1.Types.ObjectId(id) };
                console.log("Query ", query);
                let response = await this.model.admin.deleteOne(query);
                console.log("response ", response);
                return "Staff Deleted Successfully";
            }
            catch (err) {
                throw err;
            }
        };
    }
};
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_services_1.AuthService,
        model_service_1.ModelService])
], AdminService);
//# sourceMappingURL=admin.service.js.map