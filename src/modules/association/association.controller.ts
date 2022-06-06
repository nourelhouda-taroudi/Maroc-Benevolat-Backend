import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AssociationDTO } from './dto/association.dto';
import { AssociationService } from './services/association.service';

@Controller('association')
export class AssociationController {
     constructor( private  associationService:AssociationService){}
    @Post()
    create(@Body() card: AssociationDTO): Observable<AssociationDTO>
    {
      return this.associationService.createCard(card);
    }

    @Get("/all")
    findAll():Observable<AssociationDTO[]>{
        return this.associationService.findAllAssociations();
        
    }

    
    @Get(':id')
    findOne(@Param('id') id: string) {
      console.log(id)
        return this.associationService.findAsso(Number(id));
    }  

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() association : AssociationDTO ): Observable<UpdateResult> {
        return this.associationService.updateAsso(id, association)
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.associationService.deletAsso(id);
    }
}
