import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembresController } from './controller/membres.controller';
import { MembresEntity } from './models/membres.entity';
import { MembresService } from './service/membres.service';

@Module({
    imports:[
      TypeOrmModule.forFeature([MembresEntity])
    ],
    controllers: [MembresController],
    providers: [MembresService],
    exports:[MembresService]
  })
export class MembresModule {}
