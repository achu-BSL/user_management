import { Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterUserDto } from "./dto/Register-user.dto";
import { UserService } from "./user.service";

@Controller("")
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post("register")
    async register (@Body() registerUserDto: RegisterUserDto) {
        return this.userService.register(registerUserDto);
    }
}