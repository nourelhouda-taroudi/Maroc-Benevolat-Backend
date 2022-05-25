import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StoryService } from './services/story/story.service';
import { StoryController } from './controllers/story/story.controller';
import { StoryEntity } from './models/story.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([StoryEntity])
    ],
  providers: [StoryService],
  controllers: [StoryController]
})
export class StoriesModule {}
