import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/users.entity';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { NotFoundError } from 'rxjs';
import { CreateUserDto } from './users-dto/create-user.dto';
import { UpdateUserDto } from './users-dto/update-user.dto';
import { encodePassword } from 'src/utils/bcrypt';

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
        if (!user) throw new NotFoundError('User Not Found!');
        await this.cacheManager.set('User', user);
        return user;
    }

    async create(createUser: CreateUserDto) {
        const user = await this.userModel.findOne({ username: createUser.username}).exec();
        if (user) throw new ConflictException('Username Already Used/User Already Exists!');
        const password = await encodePassword(createUser.password);
        const newUser = await this.userModel.create({...createUser, password})
        return newUser.save();
    }

    async update(username: string, updateUserDto: UpdateUserDto) {
        const existingUser  = await this.userModel.findOneAndUpdate({username: username}, {$set: updateUserDto}, {new:true}).exec();
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
