import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { JwtPayload } from "../interfaces/jwt-payload.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate({ payload }: { payload: JwtPayload }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      throw new UnauthorizedException("No user found");
    }
    if (user.isDelete) {
      throw new UnauthorizedException("User is deleted");
    }
    return user;
  }
}
