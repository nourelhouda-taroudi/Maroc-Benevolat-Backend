import { AssociationDTO } from './../dto/association.dto';
import { Association } from './../entities/association.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AssociationService {
    constructor(
        @InjectRepository(Association)
        private readonly associationRepository: Repository<Association>,
      ) {}
    createAssociation(association:AssociationDTO):Promise<Association>{
        let newAssociation=new Association();
        newAssociation.address=association.address;
        newAssociation.city=association.city;
        newAssociation.codePostal=association.codePostal;
        newAssociation.facebook=association.facebook;
        newAssociation.emailAssociation=association.emailAssociation;
        newAssociation.instagram=association.instagram;
        newAssociation.logo=association.logo;
        newAssociation.objetSocial=association.objetSocial;
        newAssociation.phoneAssociation=association.phoneAssociation;
        newAssociation.nameAssociation=association.nameAssociation;
        newAssociation.sigleAssociation=association.sigleAssociation;
        newAssociation.twitter=association.twitter;
        return this.associationRepository.save(newAssociation);
    }
}
