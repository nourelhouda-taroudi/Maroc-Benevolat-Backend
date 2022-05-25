import { Observable, of, take } from 'rxjs';
import { Story } from './../../models/story.interface';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StoryService } from '../../services/story/story.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// export const storage = {
//     storage: diskStorage({
//         destination: './uploads/images',
//         filename: (req, file, cb) => {
//             const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
//             const extension: string = path.parse(file.originalname).ext;

//             cb(null, `${filename}${extension}`)
//         }
//     })

// }

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
    findSelected(@Query('take') take: number = 10, @Query('skip') skip: number = 1): Observable<Story[]> {
        take = take > 20 ? 20 : take;
        return this.storyService.findStories(take, skip);
    }
    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() story: Story
    ): Observable<UpdateResult> {
        return this.storyService.updateStory(id, story)
    }
    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.storyService.deletStory(id);
    }
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file', storage))
    // uploadFile(@UploadedFile() file): Observable<Object> {
    //     console.log(file);
    //     return of({ imagepath : file.filename});
    // }
    @Patch(':id')
    likes(){
        return this.storyService.like();
    }

}
