import { Association } from './entities/association.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AssociationController } from './association.controller';
import { AssociationService } from './services/association.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Association])
  ],
  controllers: [AssociationController],
  providers: [AssociationService],
  exports:[AssociationService]
})
export class AssociationModule {}
