import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { User, UserSchema } from 'src/entities/users.entity';

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
