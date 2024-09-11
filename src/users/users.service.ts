import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { NotFoundError } from 'rxjs';
import { CreateUserRequestType } from '../requests-types/users.create.request.type';
import { encodePassword } from 'src/utils/bcrypt';
import { User } from 'src/entities/users.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateUserRequestType } from 'src/requests-types/users.update.request.type';
import { UserResponseType } from 'src/response-types/users.response.type';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @Inject('CACHE_MANAGER') private cacheManager: Cache,
    ) {

    }

    findAll() { 
        return this.userModel.find().exec()
    }

    async findOne(username: string) {
        const cachedData = await this.cacheManager.get('User')
        if (cachedData) {
            return cachedData;
        }
        const user = await this.userModel.findOne({username: username}).exec();
        // const userInstance = plainToInstance(UserResponseType, user)
        if (!user) throw new NotFoundError('User Not Found!');
        await this.cacheManager.set('User', user);
        return user;
    }

    async create(createUser: CreateUserRequestType) {
        const user = await this.userModel.findOne({ username: createUser.username}).exec();
        if (user) throw new ConflictException('Username Is Already Used/User Already Exists!');
        const password = await encodePassword(createUser.password);
        const newUser = await this.userModel.create({...createUser, password})
        // return plainToInstance(UserResponseType, newUser.save());
        return newUser.save();
    }

    async update(username: string, updateUserType: UpdateUserRequestType) {
        const existingUser  = await this.userModel.findOneAndUpdate({username: username}, {$set: updateUserType}, {new:true}).exec();
        if (!existingUser) throw new NotFoundError('User Not Found!');
        return existingUser
    }

    async delete(username: string) {
        const user = await this.userModel.findOne({username: username}).exec();
        if (!user) throw new NotFoundError('User Not Found!');
        await this.userModel.deleteOne({username: username});
        return 'User Deleted!'
    }

}
