import { Body, Controller, Delete, Get, HttpCode, Post, Res } from '@nestjs/common';
import { RegisterUserDto } from './dto/Register-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';

@Controller('')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(201)
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: RegisterUserDto,
  ) {
    const user = await this.userService.login(loginUserDto);
    const {id, password, ...rest} = user;
    response.cookie(
      'token',
      await this.authService.jwtSign(rest.email, id),
    );
    return rest;
  }

  @Delete('deleteall')
  async clear () {
    return this.userService.clear();
  }
}
