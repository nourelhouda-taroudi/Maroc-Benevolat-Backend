import { StoriesModule } from './modules/stories/stories.module';
import { PostsModule } from './post/posts.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AssociationModule } from './modules/association/association.module';
import { CommonModule } from './modules/common/common.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { AdminModule } from './modules/admin/admin.module';
import { DemandesModule } from './demandes/demandes.module';
import { SuppressionModule } from './suppression/suppression.module';
import { MembresModule } from './membres/membres.module';
import { LikesModule } from './likes/likes.module';



@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, //global module
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          synchronize: configService.get('DB_SYNC'),
          logging: true,
          autoLoadEntities: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),

    AssociationModule,
   AdminModule,
    StoriesModule,
    AssociationModule,
    PostsModule,
    CommonModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          port: config.get('STMP_PORT'),
          secure: false,
          auth: {
            user: config.get('EMAIL'),
            pass: config.get('PASSWORD'),
          },
        },

        defaults: {
          from: `${config.get('APP_NAME')} <${config.get('EMAIL')}>`,
        },
        template: {
          dir: path.join(),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,

          },
        },
      }),
    }),
    DemandesModule,
    SuppressionModule,
    MembresModule,
    LikesModule,

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}