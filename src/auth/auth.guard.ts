import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Types } from "mongoose";

import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../admin/admin.service";
import { SessionServices } from "src/session/session.service";
import * as admindto from "../admin/dto/index";
import { config } from "dotenv";
config();
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly adminservices: AdminService,
    private jwtservice: JwtService,
    private Sessionservices: SessionServices // private readonly userservices: UserService,
  ) // private jwtservice: JwtService,
  {}
  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    console.log("token", token);
    console.log("token", request.headers.authorization);
    if (!token) {
      throw new HttpException("token not provided", HttpStatus.UNAUTHORIZED);
    } else {
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
            let fetch_admin = await this.adminservices.adminData(
              query,
              projection,
              options
            );
            if (fetch_admin) {
              let { roles, super_admin } = fetch_admin;
              let split_api_path = api_path.split("/");
              let new_path = split_api_path[2];
              let type = new_path.toUpperCase();
              console.log("type", type);

              if (super_admin != true && type != "PROFILE") {
                let check_roles = roles.includes(type);
                if (check_roles != true) {
                  throw new UnauthorizedException();
                }
              }
              
              //   fetch_admin.session_id = data._id;
              request.admin_data = fetch_admin;
              return request.admin_data;
            } else {
              throw new HttpException("admin not found", HttpStatus.NOT_FOUND);
            }
          } else {
            throw new HttpException("admin not found", HttpStatus.NOT_FOUND);
          }
        }
        // if (scope == "user" && new_path == "user") {
        //   let data = await this.verifyToken(payload);
        //   if (data) {
        //     let { _id } = payload;
        //     let query = { _id: _id };
        //     let fetch_user = await this.userservices.user_data(
        //       query,
        //       projection,
        //       options
        //     );
        //     fetch_user.session_id = data._id;
        //     request.user_data = fetch_user;
        //     return request.user_data;
        //   } else {
        //     throw new HttpException("user not found", HttpStatus.NOT_FOUND);
        //   }
        // }
      } catch {
        throw new UnauthorizedException();
      }
    }
  };

  verifyToken = async (payload: admindto.IToken) => {
    try {
      console.log("paylod---", payload);

      let { scope } = payload;
      let query: any;
      if (scope == "admin") {
        let { _id: admin_id } = payload;
        query = {
          admin_id: new Types.ObjectId(admin_id),
          access_token: { $ne: null },
        };
      }
      if (scope == "user") {
        let { _id: user_id } = payload;
        query = {
          user_id: new Types.ObjectId(user_id),
          access_token: { $ne: null },
        };
      }
      let projection = { _v: 0 };
      let options = { lean: true };
      console.log("query", query);

      let fcm_data = await this.Sessionservices.getSingleSession(
        query,
        projection,
        options
      );
      console.log("fcm data", fcm_data);

      if (fcm_data) {
        return fcm_data;
      } else {
        throw new HttpException("Sessions Not Found", HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  };
}
