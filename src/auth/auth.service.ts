import { HttpException, Injectable } from '@nestjs/common';
import { AuthRequestPayloadType } from '../requests-types/auth.request.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User } from 'src/entities/users.entity';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async validateUser({ username, password }: AuthRequestPayloadType) {
        const findUser = await this.userModel.findOne( { username: username }).exec();
        if (!findUser) throw new HttpException('Invalid Username', 401);
        const isPasswordValid = await bcrypt.compare( password, findUser.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid credentials', 401);
        }
        const { password: _, ... userWithoutPassword } = findUser.toObject();
        return this.jwtService.sign(userWithoutPassword)
    }

}