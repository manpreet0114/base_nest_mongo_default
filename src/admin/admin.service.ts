import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  Request,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Admin, User } from "../../schemas/index";
import { AdminDto } from "./dto";
import * as argon from "argon2";
import * as dto from "./dto/index";

import { AuthService } from "src/auth/auth.services";
import { ModelService } from "src/model/model.service";
import { config } from "dotenv";
config();
let { ADMIN_SCOPE, USER_SCOPE } = process.env;
let admin_scope = ADMIN_SCOPE;
let user_scope = USER_SCOPE;

let projection = { ___v: 0 };
let options = { lean: true };
let options_new = { new: true };

@Injectable()
export class AdminService {
  //   constructor(
  //     @InjectModel("admin") private readonly AdminModel: Model<Admin>,
  //     @InjectModel("user") private readonly UserModel: Model<User>,
  //     private config: ConfigService
  //   ) {}
  constructor(
    private readonly auth: AuthService,
    private model: ModelService // private config: ConfigService // private common: CommonServices
  ) {}

  login = async (dto: AdminDto) => {
    try {
      let { email, password } = dto;
      // ! check email exists
      let admin = await this.model.admin.find({ email: email });
      if (admin.length) {
        return await this.loginExisitngAdmin(admin[0], password);
      } else {
        return await this.createNewAdmin(dto);
      }
    } catch (err) {
      throw err;
    }
  };

  loginExisitngAdmin = async (admin: AdminDto, password: string) => {
    try {
      let { _id, password: hash } = admin;
      let decode = await argon.verify(hash, password);
      console.log(`🚀 decode:`, decode);

      if (decode != true) {
        throw new BadRequestException(`Incorrect Password`);
      } else {
        // ! update admin
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

        let update_admin = await this.model.admin.findOneAndUpdate(
          query,
          update,
          options
        );
        let token_payload: dto.IToken = {
          _id: _id,
          email: admin.email,
          scope: admin_scope,
          token_gen_at: +new Date(),
        };

        let token = await this.auth.createAdminToken(token_payload);
        // console.log(`🚀 token:`, token)
        update_admin._doc["token"] = token?.access_token;
        return update_admin;
      }
    } catch (err) {
      throw err;
    }
  };

  createNewAdmin = async (dto: AdminDto) => {
    try {
      let { email, password } = dto;
      if (email.toLowerCase() != "admin@gmail.com") {
        throw new BadRequestException(`This email address is not registered.`);
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
      find["token"] = token?.access_token;
      return find;
    } catch (err) {
      throw err;
    }
  };

  adminData = async (query: any, projection: any, options: any) => {
    try {
      let fetch_admin = await this.model.admin.findOne(
        query,
        projection,
        options
      );
      return fetch_admin;
    } catch (err) {
      throw err;
    }
  };

  getProfile = async (req: dto.AdminData) => {
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
    } catch (err) {
      // throw new BadRequestException();
      throw err;
    }
  };

  editProfile = async (req: dto.AdminData, body: dto.EditProfile) => {
    try {
      let { _id: user_id } = req.admin_data;
      let { name, image, country_code, phone_no, roles } = body;
      let query = { _id: user_id };
      let update = {
        ...(name && { name: name.toLocaleLowerCase().trim() }),
        ...(image && { image: image }),
        ...(country_code && { country_code: country_code }),
        ...(phone_no && { phone_no: phone_no }),
        ...(roles && { roles: roles }),
      };
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
    } catch (err) {
      throw err;
    }
  };

  logout = async (req: dto.AdminData) => {
    try {
      let { _id } = req.admin_data;
      await this.model.session.deleteMany({ admin_id: _id });
      return "Logged Out Successfully";
    } catch (err) {
      throw err;
      // throw new BadRequestException();
    }
  };

  changePassword = async (req: dto.AdminData, body: dto.ChangePassword) => {
    try {
      let { _id } = req.admin_data;
      let { old_password, new_password } = body;

      let query = { _id: _id };
      let get_admin = await this.adminData(query, projection, options);

      if (get_admin) {
        let { _id, password: hash } = get_admin;
        let decrypted_password = await argon.verify(hash, old_password);
        if (!decrypted_password) {
          // throw new HttpException(
          //   "Old Password Mismatch",
          //   HttpStatus.FORBIDDEN
          // );
          throw new BadRequestException(`Old Password Mismatch`);
        } else {
          let hash_password = await argon.hash(new_password);
          let update = { password: hash_password };
          await this.model.admin.findByIdAndUpdate(query, update, options_new);
        }
      }
      return "Password Changed Successfully";
    } catch (err) {
      throw new BadRequestException();
    }
  };

  addStaff = async (req: dto.AdminData, body: dto.AddStaff) => {
    try {
      let { _id } = req.admin_data;
      let {
        name,
        image,
        roles,
        email,
        password: default_password,
        phone_no,
        country_code,
      } = body;
      let query = { email: email.toLowerCase() };

      let staff_members = await this.adminData(query, projection, options);

      if (!staff_members) {
        let hash_password = await argon.hash(default_password);
        let data_to_save: any = {
          ...(name && { name: name.toLocaleLowerCase().trim() }),
          ...(email && { email: email.toLocaleLowerCase().trim() }),
          ...(image && { image: image }),
          ...(country_code && { country_code: country_code }),
          ...(phone_no && { phone_no: phone_no }),
          ...(roles && {
            roles: roles ? roles.map((role: any) => role.toUpperCase()) : [],
          }),
          password: hash_password,
          created_at: +new Date(),
        };
        let data = await this.model.admin.create(data_to_save);
        let projection = {
          password: 0,
          __v: 0,
        };
        let response = await this.adminData(
          { _id: data._id },
          projection,
          options
        );
        return response;
      } else {
        throw new HttpException("Email Already Exist", HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw err;
    }
  };

  getStaffList = async (req_query: dto.StaffList) => {
    try {
      let { search, pagination, limit } = req_query;
      console.log("req_query ", req_query);
      
      let query: any = { is_deleted: false, super_admin: false };
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
    } catch (err) {
      throw err;
    }
  };

  editStaff = async (_id: string, body: dto.EditStaff) => {
    try {
      let { name, image, roles, email, phone_no, country_code } = body;

      let query = { _id: new Types.ObjectId(_id) };
      let update: any = {
        ...(name && { name: name.toLocaleLowerCase().trim() }),
        ...(email && { email: email.toLocaleLowerCase().trim() }),
        ...(image && { image: image }),
        ...(country_code && { country_code: country_code }),
        ...(phone_no && { phone_no: phone_no }),
        ...(roles && {
          roles: roles ? roles.map((role: any) => role.toUpperCase()) : [],
        }),
        updated_at: +new Date(),
      };
      await this.model.admin.findByIdAndUpdate(query, update, options_new);
      let projection = {
        password: 0,
        __v: 0,
      };
      let response = await this.adminData(query, projection, options);
      return response;
    } catch (err) {
      throw err;
    }
  };

  deleteStaff = async (id: string) => {
    try {
      let query = { _id: new Types.ObjectId(id) };
      console.log("Query ", query);

      let response = await this.model.admin.deleteOne(query);
      console.log("response ", response);

      return "Staff Deleted Successfully";
    } catch (err) {
      throw err;
    }
  };
}
