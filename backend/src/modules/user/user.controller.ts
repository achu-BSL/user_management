import { Body, Controller, Get, HttpCode, Post, Res } from "@nestjs/common";
import { RegisterUserDto } from "./dto/Register-user.dto";
import { UserService } from "./user.service";
import { Response } from "express";

@Controller("")
export class UserController {

    constructor(private readonly userService: UserService) {}

    @HttpCode(201)
    @Post("register")
    async register (@Body() registerUserDto: RegisterUserDto) {
        return this.userService.register(registerUserDto);
    }

    @Post("login")
    async login (@Res({passthrough: true}) response: Response, @Body() loginUserDto: RegisterUserDto) {
        response.cookie("token", await this.userService.login(loginUserDto));
        return "Login succussfully";
    }
}