import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ModelService {
  constructor(
    @InjectModel("admin") public admin: Model<any>,
    @InjectModel("user") public user: Model<any>,
    @InjectModel("session") public session: Model<any>
  ) {}
}
