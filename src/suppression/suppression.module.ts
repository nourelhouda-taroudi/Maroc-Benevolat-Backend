import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppressionController } from './controller/suppression.controller';
import { SuppressionEntity } from './models/suppression.entity';
import { SuppressionService } from './service/suppression.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([SuppressionEntity])
  ],
  controllers: [SuppressionController],
  providers: [SuppressionService],
  exports:[SuppressionService]
})
export class SuppressionModule {}
