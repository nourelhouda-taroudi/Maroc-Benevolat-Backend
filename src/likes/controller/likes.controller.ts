import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Membres } from 'src/membres/models/membres.interface';
import { DeleteResult } from 'typeorm';
import { likes } from '../models/likes.interface';
import { LikesService } from '../service/likes.service';

@Controller('likes')
export class LikesController {


    constructor(private likeService : LikesService){}

    @Post()
    create(@Body() like : likes) : Observable<likes>{
        return this.likeService.createMembre(like);

    }

    @Post("find")
    findAll():Observable<likes[]>{
        return this.likeService.findAllMembers();
        
    }

    @Post('/adresse')
    findOne( @Body('id_post') id_post: number,
        @Body('adresse') adresse: string
    ) {
  
        return this.likeService.findAdresse(id_post,adresse);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.likeService.deletlike(id);
    }
}
