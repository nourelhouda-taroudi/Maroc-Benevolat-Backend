import { Observable, of, take } from 'rxjs';
import { Story } from './../../models/story.interface';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StoryService } from '../../services/story/story.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('story')
export class StoryController {
    constructor(private storyService: StoryService) { }
    @Post()
    create(@Body() story: Story): Observable<Story> {
        return this.storyService.createStory(story);
    }
    @Get()
    findAll():Observable<Story[]>{
          return this.storyService.findAllStories();
    }
    @Get()
    findSelected(@Query('take') take: number = 1, @Query('skip') skip: number = 0): Observable<Story[]> {
        take = take > 5 ? 5 : take;
        return this.storyService.findStories(take, skip);
    }
    @Put(':storyId')
    update(
        @Param('storyId') storyId: number,
        @Body() story: Story
    ): Observable<UpdateResult> {
        return this.storyService.updateStory(storyId, story)
    }
    @Delete(':storyId')
    delete(@Param('storyId') storyId: number): Observable<DeleteResult> {
        return this.storyService.deletStory(storyId);
    }
    @Patch(':storyId')
    likes(){
        return this.storyService.like();
    }

}
