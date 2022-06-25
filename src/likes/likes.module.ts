import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesController } from './controller/likes.controller';
import { likesEntity } from './models/likes.entity';
import { LikesService } from './service/likes.service';

@Module({
    imports:[
      TypeOrmModule.forFeature([likesEntity])
    ],
    controllers: [LikesController],
    providers: [LikesService],
    exports:[LikesService]
  })
export class LikesModule {}
