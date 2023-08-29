import { Global, Injectable, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";
import { JwtModule } from "@nestjs/jwt";
import { config } from 'dotenv';
import { ModelService } from "src/model/model.service";
import { SessionModule } from "src/session/session.module";

config();
const admin_sk = "admin_super_seckret_key"

@Global()
@Module({
    imports: [
        JwtModule.register({
        global: true,
        secret: admin_sk
    }), SessionModule,],

    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})

export class AuthModule { }
