import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import { MembresEntity } from '../models/membres.entity';
import { Membres } from '../models/membres.interface';
import { MembresService } from '../service/membres.service';

@Controller('membres')


export class MembresController {

    constructor(private membreService : MembresService){}

    @Post()
    create(@Body() membre : Membres) : Observable<Membres>{
        return this.membreService.createMembre(membre);

    }

    @Get()
    findAll():Observable<Membres[]>{
        return this.membreService.findAllMembers();
        
    }


    @Get(':id')
    findMembre( @Param('id_asso') id_asso: number,
      ) {
  
        return this.membreService.findAdresse(id_asso);
    }

    @Post('find')
    findOne( @Body('id_asso') id_asso: number,
      ) {
  
        return this.membreService.findAdresse(id_asso);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.membreService.deletMembre(id);
    }


}
