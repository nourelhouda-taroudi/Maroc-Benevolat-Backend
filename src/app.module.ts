import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { AssociationModule } from './association/association.module';




@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal:true //global module
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>{
          return{
            type: configService.get('DB_TYPE'),
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            synchronize: configService.get('DB_SYNC'),
            logging:true,
            autoLoadEntities:true

          } as TypeOrmModuleAsyncOptions
      }
    }),
    AssociationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
