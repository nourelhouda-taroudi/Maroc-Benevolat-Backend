import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import { DemandesEntity } from '../models/demandes.entity';
import { Demande } from '../models/demandes.interface';

@Injectable()
export class DemandesService {

    constructor(
        @InjectRepository(DemandesEntity)
        private readonly demandeRepository : Repository<DemandesEntity>){}
    
    
    createDemande(demande : Demande): Observable<Demande>{
    
        return from(this.demandeRepository.save(demande));
    
    }

    findAllAssociations():Observable<Demande[]>{
        return from(this.demandeRepository.find());
    }
    
    async findAsso(id: number) {
        return await this.demandeRepository.findOne({
          select: ['id','firstname', 'nameAssociation','sigleAssociation','objetSocial','phoneAssociation','address','codePostal','city','infos','logo','emailAssociation','facebook','instagram','twitter','lastname','email','gender','password','phone','association_id'],
          where: {
            id,
          },
        });
      }


deletAsso(id:number):Observable<DeleteResult>{
    return from(this.demandeRepository.delete(id));
  }
     
}
