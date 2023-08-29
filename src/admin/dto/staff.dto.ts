import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

import { StaffRoles } from "utils";

export class AddStaff {
  @ApiProperty({
    default: "staff01@yopmail.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: "qwerty",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country_code: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone_no: string;

  @ApiProperty({ enum: StaffRoles, enumName: "roles" })
  @IsArray()
  @IsOptional()
  roles: string[];
}

export class EditStaff {
  @ApiProperty({})
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country_code: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone_no: string;

  @ApiProperty({ enum: StaffRoles, enumName: "roles" })
  @IsArray()
  @IsOptional()
  roles: string[];
}

export class StaffList {

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    search: string;

    @ApiProperty({ required: false })
    pagination: Number;

    @ApiProperty({ required: false })
    limit: Number;

    // @ApiProperty({
    //     required: false,
    //     description: 'Select the filter',
    //     type: 'string',
    //     enum: Object.values(StaffRoles),
    //     // default: StaffRoles.DASHBOARD,
    // })
    // filter: StaffRoles;

}