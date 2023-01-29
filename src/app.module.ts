import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as path from 'path';

import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { ValidationModule } from './validation/validation.module';
import { PasswordModule } from './password/password.module';
import { RegistrationModule } from './registration/registration.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuctionModule } from './auction/auction.module';
import { BidsModule } from './bids/bids.module';

const {
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_ENTITIES_PATH,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_MIGRATIONS,
} = process.env;

console.log('TYPEORM_ENTITIES_PATH', TYPEORM_ENTITIES_PATH)
console.log('TYPEORM_PORT', TYPEORM_PORT)

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPEORM_CONNECTION as 'postgres',
      host: TYPEORM_HOST,
      port: +TYPEORM_PORT,
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      entities: [path.join(__dirname, TYPEORM_ENTITIES_PATH)],
      synchronize: TYPEORM_SYNCHRONIZE === 'true' || false,
      migrations: [TYPEORM_MIGRATIONS],
      migrationsTableName: 'migrations',
    }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET_KEY,
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
    AuthModule,
    LoginModule,
    UserModule,
    ValidationModule,
    PasswordModule,
    RegistrationModule,
    AuctionModule,
    BidsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
