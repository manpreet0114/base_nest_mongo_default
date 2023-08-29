import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Query,
  UseGuards,
  Request,
  Param,
  Delete,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDto } from "./dto";
import * as dto from "./dto/index";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
// ! decorator starts from @ like @Controller, @Post, etc...
@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  // @Post('login')
  // login(@Body() dto: AdminDto) {
  //     return this.adminService.login(dto);
  // }

  @Post("login")
  async login(@Body() dto: dto.AdminDto) {
    try {
      let response = await this.adminService.login(dto);
      return { message: `Login Successfully`, data: response };
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth("access_token")
  @Get("/profile")
  async profile(@Request() req: dto.AdminData) {
    try {
      let response = await this.adminService.getProfile(req);
      return response;
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth("access_token")
  @Put("/profile")
  async editProfile(
    @Request() req: dto.AdminData,
    @Body() dto: dto.EditProfile
  ) {
    try {
      let response = await this.adminService.editProfile(req, dto);
      return { message: `Edit Successfully`, data: response };
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth("access_token")
  @Put("/logout")
  async logout(@Request() req: dto.AdminData) {
    try {
      let response = await this.adminService.logout(req);
      return { message: response };
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth("access_token")
  @Put("/change/password")
  async password(
    @Request() req: dto.AdminData,
    @Body() dto: dto.ChangePassword
  ) {
    try {
      let response = await this.adminService.changePassword(req, dto);
      return { message: response };
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth("access_token")
  @Post("/staff")
  async staff(@Request() req: dto.AdminData, @Body() dto: dto.AddStaff) {
    try {
      let response = await this.adminService.addStaff(req, dto);
      return { message: `Staff Added Success`, data: response };
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth("access_token")
  @Get("/staff/list")
  async getStaffList(@Query() query: dto.StaffList) {
    try {
      console.log("GET STAFF LIST query -----------", query);
      
      let response = await this.adminService.getStaffList(query);
      return response;
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth("access_token")
  @Put("/staff/:id")
  async editStaff(@Param("id") id: string, @Body() dto: dto.EditStaff) {
    try {
      let response = await this.adminService.editStaff(id, dto);
      return { message: `Staff Edit Successfully`, data: response };
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth("access_token")
  @Delete("/staff/:id")
  async deleteStaff(@Param("id") id: string) {
    try {
      console.log("id ", id);

      let response = await this.adminService.deleteStaff(id);
      return { message: response };
    } catch (err) {
      throw err;
    }
  }
}
