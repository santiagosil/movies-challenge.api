import { Injectable } from "@nestjs/common";
import type { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import type { User } from "./entities/user.entity";

import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: {
        isDelete: false,
      },
      select: {
        id: true,
        email: true,
        isDelete: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        isDelete: true,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        password: updateUserDto.password ? bcrypt.hashSync(updateUserDto.password, 10) : undefined,
      },
      select: {
        id: true,
        email: true,
        isDelete: true,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        isDelete: true,
      },
      select: {
        id: true,
      },
    });
  }
}
