import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { SuppressionEntity } from '../models/suppression.entity';
import { SuppInter } from '../models/suppression.interface';

@Injectable()
export class SuppressionService {


constructor(
    @InjectRepository(SuppressionEntity)
    private readonly demandeRepository : Repository<SuppressionEntity>){}


createAdmin(demande : SuppInter): Observable<SuppInter>{

    return from(this.demandeRepository.save(demande));

}

findAllDemandes():Observable<SuppInter[]>{
    return from(this.demandeRepository.find());
}

}
