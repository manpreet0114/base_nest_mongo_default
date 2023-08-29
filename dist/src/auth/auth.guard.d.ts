import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../admin/admin.service";
import { SessionServices } from "src/session/session.service";
import * as admindto from "../admin/dto/index";
export declare class AuthGuard implements CanActivate {
    private readonly adminservices;
    private jwtservice;
    private Sessionservices;
    constructor(adminservices: AdminService, jwtservice: JwtService, Sessionservices: SessionServices);
    canActivate: (context: ExecutionContext) => Promise<boolean>;
    verifyToken: (payload: admindto.IToken) => Promise<any>;
}
