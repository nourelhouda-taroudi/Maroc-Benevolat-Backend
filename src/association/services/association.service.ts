import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'path';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { AssociationEntity } from '../models/association.entity';
import { association_card } from '../models/association.interface';

@Injectable()
export class AssociationService {
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

// findCards(take : number = 10, skip: number = 0):Observable<association_card[]>{
//    return from(
//     this.associationRepository.findAndCount({take, skip}).then(([cards]) => {
//         return <association_card[]>cards
 
//     })
//    );
  
// }
}
