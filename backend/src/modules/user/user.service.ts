import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/Register-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/Update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Is user exist within the email.
   * @param email - To find the user.
   * @returns userDetails | undefined(if not exist)
   */
  private async isUserExist(email: string, username: string) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    return user;
  }

  /**
   * The register method,
   * @param { email, password} - To create new user.
   * @returns userDetails - The new userDetails from database.
   * @throws BadReuestException - If user is exist within the email.
   */
  async register({ email, password, username }: RegisterUserDto) {
    if ((await this.isUserExist(email, username)) !== null)
      throw new BadRequestException();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return user;
  }

  /**
   * Login with email and password.
   * @param loginUserDto - { email: string, password: string }
   * @returns user details from the data base.
   */
  async login(loginUserDto: RegisterUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (user == null) throw new BadRequestException();
    if (!(await bcrypt.compare(loginUserDto.password, user.password)))
      throw new BadRequestException();
    return user;
  }

  /**
   *To update user deails.
   * @param id - The UserId to find the specific user.
   * @param user - The new details of the user to update.
   * @returns  user new details.
   * @throws BadRequestException - if there is any issue while 
   * updating user (e.g. username or email already taken).
   * @throws BadGetwayException - when couldn't find user whihing
   * the id.
   */
  async updateUser(id: number, user: Partial<UpdateUserDto>) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: user,
        select: {
          email: true,
          username: true,
          profile: true
        }
      });

      if(!updatedUser) throw new BadGatewayException();
      return updatedUser;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
