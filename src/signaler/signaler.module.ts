import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignalerController } from './controller/signaler.controller';
import { SignalerEntity } from './models/signaler.entity';
import { SignalerService } from './service/signaler.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([SignalerEntity])
  ],
  controllers: [SignalerController],
  providers: [SignalerService],
  exports:[SignalerService]
})
export class SignalerModule {}
