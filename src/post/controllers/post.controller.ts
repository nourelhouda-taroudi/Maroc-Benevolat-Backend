import { Observable, of, take } from 'rxjs';
import { Posts} from './../../post/models/post.interface';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from '../../post/services/post.service';
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

}
