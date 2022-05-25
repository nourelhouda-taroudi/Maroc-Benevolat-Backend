import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'path';
import { from, identity, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { AssociationEntity } from '../models/association.entity';
import { association_card } from '../models/association.interface';

@Injectable()
export class AssociationService {
    public associations!: association_card[] ;
   

    
;
constructor(
    @InjectRepository(AssociationEntity)
    private readonly associationRepository: Repository<AssociationEntity>
){}

createCard(association: association_card): Observable<association_card>{
    return from(this.associationRepository.save(association));
}

findAllAssociations():Observable<association_card[]>{
    return from(this.associationRepository.find());
}



async findAsso(id: number) {
    return await this.associationRepository.findOne({
      select: ['id', 'nom','siege','objet','telephone','adresse','code_postal','ville','description','email','facebook','instagram','twitter'],
      where: {
        id,
      },
    });
  }

  updateAsso(id:number,association: association_card):Observable<UpdateResult>{
    return from(this.associationRepository.update(id,association));

}


}

