import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
    imports: [PrismaModule, AuthModule, MulterModule.register({
        dest: "./uploads"
    })],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}