import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
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

}
