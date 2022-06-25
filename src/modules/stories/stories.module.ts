import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationModule } from './../association/association.module';
import { StoryController } from './controllers/story/story.controller';
import { StoryEntity } from './models/story.entity';
import { StoryService } from './services/story/story.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([StoryEntity]),
        AssociationModule
    ],
  providers: [StoryService],
  controllers: [StoryController]
})
export class StoriesModule {}
