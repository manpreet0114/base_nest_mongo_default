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
exports.AdminSchema = exports.Admin = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const moment_1 = require("moment");
let Admin = exports.Admin = class Admin {
    constructor() {
        this.super_admin = false;
        this.is_blocked = false;
        this.is_deleted = false;
        this.updated_at = 0;
        this.created_at = (0, moment_1.default)().utc().valueOf();
    }
};
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], Admin.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ isRequired: false }),
    __metadata("design:type", String)
], Admin.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ isRequired: false }),
    __metadata("design:type", String)
], Admin.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Admin.prototype, "phone_no", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Admin.prototype, "country_code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Admin.prototype, "super_admin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: String, enum: Object.values(utils_1.StaffRoles) }], isRequired: true }),
    __metadata("design:type", Array)
], Admin.prototype, "roles", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Admin.prototype, "is_blocked", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Admin.prototype, "is_deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Admin.prototype, "updated_at", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Admin.prototype, "created_at", void 0);
exports.Admin = Admin = __decorate([
    (0, mongoose_1.Schema)()
], Admin);
exports.AdminSchema = mongoose_1.SchemaFactory.createForClass(Admin);
//# sourceMappingURL=admin.schema.js.map