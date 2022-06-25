import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandesController } from './controller/demandes.controller';
import { DemandesEntity } from './models/demandes.entity';
import { DemandesService } from './services/demandes.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([DemandesEntity])
  ],
  controllers: [DemandesController],
  providers: [DemandesService],
  exports:[DemandesService],
})
export class DemandesModule {}
