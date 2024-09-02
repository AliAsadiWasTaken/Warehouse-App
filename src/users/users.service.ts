import { ConflictException, Inject, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { NotFoundError } from 'rxjs';
import { CreateUserDto } from '../dtos/create-user.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { User } from 'src/entities/users.entity';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserModel } from 'src/entities/users.model';

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
        const userObject = user.toObject();
        console.log(user)
        console.log(user.constructor.name)
        console.log(userObject)
        console.log(userObject.constructor.name)
        // const augmentedUser = plainToInstance(UserModel, user)
        // console.log(augmentedUser.constructor.name)
        // const userInstance = plainToInstance(UserModel, user)
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
