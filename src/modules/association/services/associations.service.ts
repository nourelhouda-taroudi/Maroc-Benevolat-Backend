import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'path';
import { from, identity, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { AssociationDTO } from '../dto/association.dto';
import { Association } from '../entities/association.entity';


@Injectable()
export class AssociationService {
    public associations!: AssociationDTO[] ;
   

    
;
constructor(
    @InjectRepository(Association)
    private readonly associationRepository: Repository<Association>
){}

createCard(association: AssociationDTO): Observable<AssociationDTO>{
    return from(this.associationRepository.save(association));
}

findAllAssociations():Observable<AssociationDTO[]>{
    return from(this.associationRepository.find());
}



async findAsso(id: number) {
    return await this.associationRepository.findOne({
      select: ['id', 'nameAssociation','sigleAssociation','objetSocial','phoneAssociation','address','codePostal','city','infos','logo','emailAssociation','facebook','instagram','twitter'],
      where: {
        id,
      },
    });
  }

  updateAsso(id:number,association: AssociationDTO):Observable<UpdateResult>{
    return from(this.associationRepository.update(id,association));

}


}

