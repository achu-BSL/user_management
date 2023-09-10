import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/Register-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

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
      where: {OR: [
        {email},
        {username}
      ]}
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

  async login(loginUserDto: RegisterUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (user == null) throw new BadRequestException();
    if (!(await bcrypt.compare(loginUserDto.password, user.password)))
      throw new BadRequestException();
    return user;
  }

  async clear () {
    await this.prisma.user.deleteMany();
    return "Deleted";
  }
}
