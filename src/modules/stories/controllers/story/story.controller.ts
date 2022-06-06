import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { StoryService } from '../../services/story/story.service';
import { StoryEntity } from './../../models/story.entity';
import { Story } from './../../models/story.interface';

@Controller('story')
export class StoryController {
  constructor(private storyService: StoryService) {}
  @Post()
  create(@Body() story: Story): Promise<StoryEntity> {
    return this.storyService.createStory(story);
  }
  @Get()
  findAll(): Observable<StoryEntity[]> {
    return this.storyService.findAllStories();
  }
  @Get()
  findSelected(
    @Query('take') take: number = 1,
    @Query('skip') skip: number = 0,
  ): Observable<StoryEntity[]> {
    take = take > 5 ? 5 : take;
    return this.storyService.findStories(take, skip);
  }
  @Put(':storyId')
  update(
    @Param('storyId') storyId: number,
    @Body() story: Story,
  ): Observable<UpdateResult> {
    return this.storyService.updateStory(storyId, story);
  }
  @Delete(':storyId')
  delete(@Param('storyId') storyId: number): Observable<DeleteResult> {
    return this.storyService.deletStory(storyId);
  }
  @Patch(':storyId')
  likes() {
    return this.storyService.like();
  }
  @Get('association/:id_association')
  getAssociationStories(@Param('id_association') associationId: number) {
    return this.storyService.getAssociationStories(associationId);
  }
}
