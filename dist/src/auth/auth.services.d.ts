import { Types } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as admindto from "../admin/dto/index";
import { SessionServices } from "src/session/session.service";
export declare class AuthService {
    private jwtservice;
    private sessionservice;
    constructor(jwtservice: JwtService, sessionservice: SessionServices);
    createAdminToken: (token_data: admindto.IToken) => Promise<any>;
    createUserToken: (_id: Types.ObjectId, body: any) => Promise<any>;
    generateToken: (token_data: admindto.IToken) => Promise<string>;
    saveSession: (access_token: string, token_data: admindto.IToken, body: any) => Promise<any>;
}
