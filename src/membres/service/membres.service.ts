import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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




    async findAdresse(id_asso:number) {
        return await this.membreRepository.find({


            where: {
             id_asso
            },
          });
      }

     
     
      updateMembre(id: number, membre: Membres): Observable<UpdateResult> {
        return from(this.membreRepository.update(id, membre));
      }

  
      deletMembre(id:number):Observable<DeleteResult>{
        return from(this.membreRepository.delete(id));
      }
   
}   