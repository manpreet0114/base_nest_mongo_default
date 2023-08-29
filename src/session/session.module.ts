import { Global, Module } from "@nestjs/common";
import { SessionServices } from "./session.service";
import { ModelModule } from "src/model/model.module";

@Global()
@Module({
    imports: [ModelModule],
    providers: [SessionServices],
    exports: [SessionServices]
})
export class SessionModule { }