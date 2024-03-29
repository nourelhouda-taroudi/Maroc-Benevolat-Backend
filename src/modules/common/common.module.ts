import { diskStorage } from 'multer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CommonController } from './common.controller';
import { CommonService } from './services/common.service';
import { editFileName, imageFileFilter } from 'src/utils/file-storage';
import { MailService } from './services/mail/mail.service';

@Module({
  controllers: [CommonController],
  providers: [CommonService, MailService],
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage:diskStorage({
          destination: './uploads',
          filename: editFileName,
        }),
        fileFilter:imageFileFilter
      }),
      inject: [ConfigService],
    }),
  ],
  exports:[MailService]
})
export class CommonModule {}

