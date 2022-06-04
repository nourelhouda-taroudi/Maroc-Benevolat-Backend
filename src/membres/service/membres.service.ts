import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { MembresEntity } from '../models/membres.entity';
import { Membres } from '../models/membres.interface';

@Injectable()
export class MembresService {

    constructor(
        @InjectRepository(MembresEntity)
        private readonly membreRepository : Repository<MembresEntity>){}
    
    
    createMembre(membre : MembresEntity): Observable<Membres>{
    
        return from(this.membreRepository.save(membre));
    
    }
    
    findAllMembers():Observable<Membres[]>{
        return from(this.membreRepository.find());
    }

}
