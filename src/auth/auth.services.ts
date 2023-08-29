import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as admindto from "../admin/dto/index";
import { config } from "dotenv";
config();
import { SessionServices } from "src/session/session.service";

let { ADMIN_SCOPE, USER_SCOPE } = process.env;
let admin_scope = ADMIN_SCOPE;
let user_scope = USER_SCOPE;

@Injectable()
export class AuthService {
  constructor(
    private jwtservice: JwtService,
    private sessionservice: SessionServices
  ) {}

  createAdminToken = async (token_data: admindto.IToken) => {
    try {
      // let data: admindto.IToken = {
      //     _id: _id,
      //     scope: admin_scope,
      //     token_gen_at: +new Date()
      // }
      console.log("inside createAdminToken----", token_data);

      let access_token = await this.generateToken(token_data);
      let response = await this.saveSession(access_token, token_data, null);
      return response;
    } catch (error) {
      throw error;
    }
  };

  createUserToken = async (_id: Types.ObjectId, body: any) => {
    try {
      let token_data: admindto.IToken = {
        _id: _id,
        scope: user_scope,
        token_gen_at: +new Date(),
        // email: ""
      };
      let access_token = await this.generateToken(token_data);
      let response = await this.saveSession(access_token, token_data, body);
      return response;
    } catch (error) {
      throw error;
    }
  };

  generateToken = async (token_data: admindto.IToken) => {
    try {
      let token: string = await this.jwtservice.signAsync(token_data);
      return token;
    } catch (err) {
      throw err;
    }
  };

  saveSession = async (
    access_token: string,
    token_data: admindto.IToken,
    body: any
  ) => {
    try {
      const { token_gen_at, scope, _id } = token_data;
      let data: any = {
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
        data.fcm_token = body?.fcm_token;
        data.device_type = body?.device_type;
        let query = { user_id: _id };
        await this.sessionservice.logoutSessionUser(query);
      }

      let save_data = await this.sessionservice.saveSession(data);
      return save_data;
    } catch (err) {
      throw err;
    }
  };
}
