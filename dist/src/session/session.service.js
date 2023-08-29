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
exports.SessionServices = void 0;
const common_1 = require("@nestjs/common");
const model_service_1 = require("../model/model.service");
let SessionServices = exports.SessionServices = class SessionServices {
    constructor(model) {
        this.model = model;
        this.saveSession = async (data) => {
            try {
                let session_data = await this.model.session.create(data);
                return session_data;
            }
            catch (error) {
                throw error;
            }
        };
        this.getSingleSession = async (query, projection, options) => {
            try {
                let session_data = await this.model.session.findOne(query, projection, options);
                return session_data;
            }
            catch (error) {
                throw error;
            }
        };
        this.getSession = async (query, projection, options) => {
            try {
                let session_data = await this.model.session.find(query, projection, options);
                return session_data;
            }
            catch (error) {
                throw error;
            }
        };
        this.logoutSessionAdmin = async (query) => {
            try {
                await this.model.session.deleteOne(query);
                let response = { message: "Logout Successful" };
                return response;
            }
            catch (error) {
                throw error;
            }
        };
        this.logoutSessionUser = async (query) => {
            try {
                await this.model.session.deleteOne(query);
                let response = { message: "Logout Successful" };
                return response;
            }
            catch (error) {
                throw error;
            }
        };
    }
};
exports.SessionServices = SessionServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [model_service_1.ModelService])
], SessionServices);
//# sourceMappingURL=session.service.js.map