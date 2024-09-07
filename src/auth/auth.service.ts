import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { RegisterUserDto } from "./dto/register-user.dto";
import type { User } from "src/users/entities/user.entity";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import type { JwtPayload } from "./interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  create(createUserDto: RegisterUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10),
      },
      select: {
        id: true,
        email: true,
      },
    });
  }
  async login(loginUserDto: RegisterUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginUserDto.email,
        isDelete: false,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    if (!user) throw new UnauthorizedException("Invalid email or password");
    if (!bcrypt.compareSync(loginUserDto.password, user.password))
      throw new UnauthorizedException("Invalid email or password");

    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    return {
      access_token: this.jwtService.sign({ payload }),
    };
  }
}
