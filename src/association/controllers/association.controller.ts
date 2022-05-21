import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { table } from 'console';
import { get } from 'http';
import { Observable, skip, take } from 'rxjs';
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

    @Get()
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

    


}
