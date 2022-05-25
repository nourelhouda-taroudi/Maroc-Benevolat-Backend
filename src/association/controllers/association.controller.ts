import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { table } from 'console';
import { get } from 'http';
import { Observable, skip, take } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { association_card } from '../models/association.interface';
import { AssociationService } from '../services/association.service';

@Controller('association')
export class AssociationController {
 constructor( private  associationService:AssociationService){}
    @Post()
    create(@Body() card: association_card): Observable<association_card>
    {
      return this.associationService.createCard(card);
    }

    @Get("/all")
    findAll():Observable<association_card[]>{
        return this.associationService.findAllAssociations();
        
    }

    // @Get()
    // findSelected(@Query('take') take : number = 1,
    // @Query('skip') skip : number = 1,
    // ):Observable<association_card[]>{
    //     take = take > 20 ? 20  : take;
    //     return this.associationService.findCards(take,skip);
    // }

    
    @Get(':id')
    findOne(@Param('id') id: string) {
      console.log(id)
        return this.associationService.findAsso(Number(id));
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() association : association_card ): Observable<UpdateResult> {
        return this.associationService.updateAsso(id, association)
    }

}
