import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    },
  ],)],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, LocalStrategy],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
