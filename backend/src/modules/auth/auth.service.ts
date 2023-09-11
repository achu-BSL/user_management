import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from './interface/Payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async jwtSign(userId: number) {
    const payload: PayloadInterface = {
      userId,
    };
    return await this.jwtService.signAsync(payload);
  }

  async jwtVerify(token: string) {
    try {
      const payload: PayloadInterface = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      return payload;
    } catch (err) {
      return null;
    }
  }
}
