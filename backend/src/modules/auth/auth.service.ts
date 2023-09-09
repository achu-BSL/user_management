import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async jwtSign(email: string, userId: number) {
    const payload = {
      email,
      userId,
    };
    return await this.jwtService.signAsync(payload);
  }
}
