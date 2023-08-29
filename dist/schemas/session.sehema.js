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
exports.SessionSchema = exports.Session = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const utils_1 = require("../utils");
const moment_1 = require("moment");
let Session = exports.Session = class Session {
    constructor() {
        this.admin_id = null;
        this.user_id = null;
        this.access_token = null;
        this.fcm_token = null;
        this.token_gen_at = null;
        this.created_at = (0, moment_1.default)().utc().valueOf();
    }
};
__decorate([
    (0, mongoose_1.Prop)({ default: 'USER', enum: utils_1.UserType }),
    __metadata("design:type", String)
], Session.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'admin', required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Session.prototype, "admin_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'user', required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Session.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Session.prototype, "access_token", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Session.prototype, "fcm_token", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Session.prototype, "token_gen_at", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Session.prototype, "created_at", void 0);
exports.Session = Session = __decorate([
    (0, mongoose_1.Schema)()
], Session);
exports.SessionSchema = mongoose_1.SchemaFactory.createForClass(Session);
//# sourceMappingURL=session.sehema.js.map