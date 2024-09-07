import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class RegisterUserDto {
  @ApiProperty({
    default: "",
    example: "johan@gmail.com",
  })
  @IsString()
  @MinLength(1)
  email: string;

  @ApiProperty({
    default: "",
    example: "12345678",
  })
  @IsString()
  @MinLength(1)
  password: string;

  constructor() {
    this.email = "";
    this.password = "";
  }
}
