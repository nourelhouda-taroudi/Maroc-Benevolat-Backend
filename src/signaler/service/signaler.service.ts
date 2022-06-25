import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import { SignalerEntity } from '../models/signaler.entity';
import { Signaler } from '../models/signaler.interface';

@Injectable()
export class SignalerService {
    constructor(
        @InjectRepository(SignalerEntity)
        private readonly signRepository : Repository<SignalerEntity>){}
        
    createSignal(signal : SignalerEntity): Observable<Signaler>{      
    return from(this.signRepository.save(signal));

    }

findAllSignal():Observable<Signaler[]>{
    return from(this.signRepository.find());
}

deletSignal(id:number):Observable<DeleteResult>{
    return from(this.signRepository.delete(id));
  }

}
