import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("auth")
@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiResponse({ status: 201, description: "User created successfully", type: User })
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.create(registerUserDto);
  }

  @Post("login")
  @ApiResponse({ status: 201, description: "User logged in successfully", type: User })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: "User logged in successfully", type: User })
  getUserProtected(@Req() request: Express.Request) {
    return request.user;
  }
}
