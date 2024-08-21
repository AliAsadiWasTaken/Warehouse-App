import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entities/users.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService
    ) {}


    async validateUser({ username, password }: AuthPayloadDto) {
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