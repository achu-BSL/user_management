import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterUserDto } from "./dto/Register-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService){}

    /**
     * Is user exist within the email.
     * @param email - To find the user.
     * @returns userDetails | undefined(if not exist)
     */
    private async isUserExist (email: string) {
        const user = this.prisma.user.findUnique({
            where: {email}
        })
        return user;
    }

    /**
     * The register method,
     * @param { email, password} - To create new user. 
     * @returns userDetails - The new userDetails from database.
     * @throws BadReuestException - If user is exist within the email.
     */
    async register ({email, password}: RegisterUserDto) {
        if(this.isUserExist(email)) throw new BadRequestException();
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,     
            }
        })
        return user;
    }
}