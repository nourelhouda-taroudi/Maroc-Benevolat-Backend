import { SignalerService } from './../service/signaler.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Signaler } from '../models/signaler.interface';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';

@Controller('signaler')
export class SignalerController {
    constructor(private signService:SignalerService){}
    @Post()
    create(@Body() signal : Signaler) : Observable<Signaler>{
        return this.signService.createSignal(signal);

    }

    @Get()
    findAll():Observable<Signaler[]>{
        return this.signService.findAllSignal();
        
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.signService.deletSignal(id);
    }
}
