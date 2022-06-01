import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { Demande } from '../models/demandes.interface';
import { DemandesService } from '../services/demandes.service';

@Controller('demandes')
export class DemandesController {

    constructor(private demandeService : DemandesService){}


    @Post()
    create(@Body() demande : Demande) : Observable<Demande>{
        return this.demandeService.createDemande(demande);


    }

    @Get("")
    findAll():Observable<Demande[]>{
        return this.demandeService.findAllAssociations();
        
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      console.log(id)
        return this.demandeService.findAsso(Number(id));
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.demandeService.deletAsso(id);
    }
}
