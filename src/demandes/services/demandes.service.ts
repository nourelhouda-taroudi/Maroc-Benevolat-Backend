import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';
import { UserSignUpDTO } from 'src/modules/user/dto/user-register.dto';
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
          select: ['id','firstname', 'nameAssociation','sigleAssociation','objetSocial','phoneAssociation','address','codePostal','city','infos','logo','emailAssociation','facebook','instagram','twitter','lastname','email','gender','password','phone'],
          where: {
            id,
          },
        });
      }


deletAsso(id:number):Observable<DeleteResult>{
    return from(this.demandeRepository.delete(id));
  }

  async createUserDemande(demandeDTO: UserSignUpDTO){
    const { email, firstname, lastname, gender, password, phone, association } =
      demandeDTO;      
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    let demande = new DemandesEntity();
    demande.firstname = firstname;
    demande.lastname = lastname;
    demande.email = email;
    demande.gender = gender;
    demande.phone = phone;
    demande.password = hash;
    demande.address = association.address;
    demande.city = association.city;
    demande.codePostal = association.codePostal;
    demande.facebook = association.facebook;
    demande.emailAssociation = association.emailAssociation;
    demande.instagram = association.instagram;
    demande.logo = association.logo;
    demande.objetSocial = association.objetSocial;
    demande.phoneAssociation = association.phoneAssociation;
    demande.nameAssociation = association.nameAssociation;
    demande.sigleAssociation = association.sigleAssociation;
    demande.twitter = association.twitter;
    demande.infos = association.infos;
    return this.demandeRepository.save(demande);
  }
     
}
