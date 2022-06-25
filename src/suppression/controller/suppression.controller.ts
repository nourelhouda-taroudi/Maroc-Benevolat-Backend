import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SuppInter } from '../models/suppression.interface';
import { SuppressionService } from '../service/suppression.service';

@Controller('suppression')
export class SuppressionController {

    constructor(private suppService : SuppressionService){}


    @Post()
    create(@Body() admin : SuppInter) : Observable<SuppInter>{
        return this.suppService.createAdmin(admin);


    }


    @Get()
    findAll():Observable<SuppInter[]>{
        return this.suppService.findAllDemandes();
        
    }
}
