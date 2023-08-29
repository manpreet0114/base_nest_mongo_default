import { Module } from '@nestjs/common';
// import { JwtModule } from "@nestjs/jwt";
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthService } from 'src/auth/auth.services';
import { ModelService } from 'src/model/model.service';
import { SessionServices } from 'src/session/session.service';
import { ModelModule } from 'src/model/model.module';
import { SessionModule } from 'src/session/session.module';

@Module({
    imports:[ModelModule,SessionModule],
    providers: [AdminService, AuthService],
    controllers: [AdminController],
    exports: [AdminService]
})
export class AdminModule { }
