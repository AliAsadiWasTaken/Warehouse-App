import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaterialsModule } from './materials/materials.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
  imports: [
    MaterialsModule,
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/Warehouse"),
    CacheModule.register({
      isGlobal: true,
      store: redisStore
    })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
