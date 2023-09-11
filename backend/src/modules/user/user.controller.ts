import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { RegisterUserDto } from './dto/Register-user.dto';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { AuthUserGuard } from '../auth/auth-user.guard';
import { UpdateUserDto } from './dto/Update-user.dto';
import { PayloadInterface } from '../auth/interface/Payload.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
      await this.authService.jwtSign(id), {
        httpOnly: true,
        path: "/",
      }
      );
    return rest;
  }

  @UseGuards(AuthUserGuard)
  @UseInterceptors(FileInterceptor("profile", {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./uploads")
      },
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + -Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    })
  }))
  @Patch("profile/update")
  async updateProfile (@Req()req: Request & PayloadInterface, @Body() user: Partial<UpdateUserDto>) {
    if(req.file) user.profile = req.file.filename;
    return this.userService.updateUser(req.userId, user);
  }


}
