import {
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common';

import { AmqpModule } from './amqp/amqp.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { OAuthMiddleware } from './common/middlewares/oauth.middleware';
// import { AmqpModule } from './amqp/amqp.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import GraphQLModule from './graphql/graphql.module';
import { LoaderProvider } from './graphql/loader/loader.prodiver';
import { GraphQLUploadModule } from './graphql/upload/upload.module';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { LoggerModule } from './logger/logger.module';
import { OAuthModule } from './oauth/oauth.module';
import { RedisModule } from './redis/redis.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    SocketModule,
    RedisModule,
    AmqpModule,
    GraphQLModule,
    GraphQLUploadModule,
    OAuthModule,
    CoreModule,
  ],
  providers: [LoaderProvider],
  controllers: [HealthcheckController],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer.apply(OAuthMiddleware, LoggerMiddleware).forRoutes('*');
  }
}
