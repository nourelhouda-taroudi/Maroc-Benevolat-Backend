import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PostService } from '../../post/services/post.service';
import { Posts } from './../../post/models/post.interface';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }
    @Post()
    create(@Body() post: Posts): Observable<Posts> {
        return this.postService.createPost(post);
    }
    @Get()
    findAll():Observable<Posts[]>{
          return this.postService.findAllPosts();
    }
    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() post: Posts
    ): Observable<UpdateResult> {
        return this.postService.updatePost(id, post)
    }
    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.postService.deletPost(id);
    }
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file', storage))
    // uploadFile(@UploadedFile() file): Observable<Object> {
    //     console.log(file);
    //     return of({ imagepath : file.filename});
    // }
    @Patch(':id')
    likes(){
        return this.postService.like();
    }

    @Get('association/:id_association')
    getAssociationPosts(@Param('id_association') idAssociation: number){
        return this.postService.getAssociationPosts(idAssociation);
    }
}
