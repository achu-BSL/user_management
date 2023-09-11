import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { PayloadInterface } from "./interface/Payload.interface";


@Injectable() 
export class AuthUserGuard implements CanActivate {

    constructor (private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request & PayloadInterface = context.switchToHttp().getRequest();
        const verify: PayloadInterface | null = await this.authService.jwtVerify(request.cookies.token || "");
        if(verify === null) return false;
        request.userId = verify.userId;
        return true;
    }
}