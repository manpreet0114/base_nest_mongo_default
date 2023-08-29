import { Injectable } from "@nestjs/common";
import { Session, SessionDocument } from "schemas/session.sehema";

import { ModelService } from "src/model/model.service";

@Injectable()
export class SessionServices {
  constructor(private model: ModelService) {}

  saveSession = async (data: any) => {
    try {
      let session_data = await this.model.session.create(data);
      return session_data;
    } catch (error) {
      throw error;
    }
  };

  getSingleSession = async (query: any, projection: any, options: any) => {
    try {
      let session_data = await this.model.session.findOne(
        query,
        projection,
        options
      );
      return session_data;
    } catch (error) {
      throw error;
    }
  };

  getSession = async (query: any, projection: any, options: any) => {
    try {
      let session_data = await this.model.session.find(
        query,
        projection,
        options
      );
      return session_data;
    } catch (error) {
      throw error;
    }
  };

  logoutSessionAdmin = async (query: any) => {
    try {
      await this.model.session.deleteOne(query);
      let response = { message: "Logout Successful" };
      return response;
    } catch (error) {
      throw error;
    }
  };

  logoutSessionUser = async (query: any) => {
    try {
      await this.model.session.deleteOne(query);
      let response = { message: "Logout Successful" };
      return response;
    } catch (error) {
      throw error;
    }
  };
}
