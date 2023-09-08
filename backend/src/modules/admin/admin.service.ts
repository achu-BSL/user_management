import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from '../user/dto/Update-user.dto';
import { RegisterUserDto } from '../user/dto/Register-user.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(q: string) {
    // where: {} //todo retrvie expect current user.
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: q,
              mode: "insensitive"
            },
          },
          {
            email: {
              contains: q,
              mode: "insensitive"
            },
          },
        ],
      },
      include: {
        admin: true,
      },
    });
    return users.map((user) => {
      const { password, admin, ...rest } = user;
      return { ...rest, isAdmin: admin !== null };
    });
  }

  async makeAdmin(id: number) {
    try {
      await this.prisma.admin.create({
        data: { userId: id },
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async removeUser(id: number) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async updateUser(userId: number, updateUserDto: Partial<UpdateUserDto>) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: updateUserDto,
      });
      const { password, ...rest } = user;
      return rest;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async createUser(registerUserDto: RegisterUserDto) {
    const user = await this.prisma.user.create({
      data: registerUserDto,
    });
    const { password, ...rest } = user;
    return rest;
  }
}
