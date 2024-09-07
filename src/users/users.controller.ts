import { Controller, Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: "Users retrieved successfully" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: "User retrieved successfully" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, description: "User updated successfully" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
