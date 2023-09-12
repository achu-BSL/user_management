import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { UpdateUserDto } from "../user/dto/Update-user.dto";
import { RegisterUserDto } from "../user/dto/Register-user.dto";

@Controller("admin")
export class AdminController {
    constructor(private readonly adminService: AdminService) {};

    @Get("users")
     async getUsers(@Query('q') q: string ) {
        return this.adminService.getUsers(q || "");
    }

    @Patch("user/makeadmin/:id")
    async makeAdmin(@Param('id') id: string) {
        console.log(id);
        return this.adminService.makeAdmin(+id);
    }

    @Delete("user/delete/:id")
    async removeUser (@Param('id') id: string) {
        return this.adminService.removeUser(+id);
    }

    @Patch("user/update/:id")
    async updateUser(@Param('id') id: string, @Body() updateUserDto: Partial<UpdateUserDto>) {
        return this.adminService.updateUser(+id, updateUserDto);
    }

    @Post('user/create')
    async createUser (@Body() registerUserDto: RegisterUserDto) {
        return this.adminService.createUser(registerUserDto);
    }
}