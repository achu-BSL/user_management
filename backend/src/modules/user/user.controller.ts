import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { RegisterUserDto } from "./dto/Register-user.dto";
import { UserService } from "./user.service";

@Controller("")
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post("register")
    @HttpCode(201)
    async register (@Body() registerUserDto: RegisterUserDto) {
        return this.userService.register(registerUserDto);
    }
}