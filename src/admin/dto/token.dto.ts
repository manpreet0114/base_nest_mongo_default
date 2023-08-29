import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsEmail,
} from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class IToken {
  @ApiProperty({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  scope: string;

  @IsOptional()
  _doc?: any;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  token_gen_at: Number;
}

export class GenerateToken {
  @ApiProperty()
  user_id: Types.ObjectId;

  @ApiProperty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsString()
  fcm_token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  token_gen_at: Number;
}

export class GetById {
  @ApiProperty({
    // description: 'The ID of the item',
    // example: '1234567890',
  })
  id: string;
}