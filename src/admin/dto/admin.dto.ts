import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class AdminDto {
  @IsOptional()
  _id?: Types.ObjectId;

  @ApiProperty({
    default: "admin@gmail.com",
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

  @IsOptional()
  token?: string;

  @IsOptional()
  _doc?: any;

  select?: any;
}

export class AdminData {
  admin_data: any;
}

export class EditProfile {
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

  @ApiProperty()
  @IsArray()
  @IsOptional()
  roles: string;
}

export class ChangePassword {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  old_password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  new_password: string;
}
