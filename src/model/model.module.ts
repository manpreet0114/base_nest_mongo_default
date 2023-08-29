import { Global, Module } from "@nestjs/common";
import { ModelService } from "./model.service";
import { MongooseModule } from "@nestjs/mongoose";

import { AdminSchema, UserSchema, SessionSchema } from "schemas";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "admin", schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "session", schema: SessionSchema }]),
  ],
  providers: [ModelService],
  exports: [ModelService],
})
export class ModelModule {}
