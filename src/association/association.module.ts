import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationController } from './controllers/association.controller';
import { AssociationEntity } from './models/association.entity';
import { AssociationService } from './services/association.service';

@Module({
  imports:[
  TypeOrmModule.forFeature([AssociationEntity])
  ],
  providers: [AssociationService],
  controllers:[AssociationController],
})
export class AssociationModule {}
