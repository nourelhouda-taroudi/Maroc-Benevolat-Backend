import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './controller/admin.controller';
import { AdminEntity } from './models/admin.entity';
import { AdminService } from './service/admin.service';

@Module({
    imports:[
      TypeOrmModule.forFeature([AdminEntity])
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports:[AdminService]
  })
export class AdminModule {}
