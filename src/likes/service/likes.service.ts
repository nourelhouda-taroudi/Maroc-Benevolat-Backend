import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { MembresEntity } from 'src/membres/models/membres.entity';
import { Membres } from 'src/membres/models/membres.interface';
import { DeleteResult, Repository } from 'typeorm';
import { likesEntity } from '../models/likes.entity';
import { likes } from '../models/likes.interface';

@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(likesEntity)
        private readonly membreRepository : Repository<likesEntity>){}
    
    
    createMembre(membre : likesEntity): Observable<likes>{
    
        return from(this.membreRepository.save(membre));
    
    }
    
    findAllMembers():Observable<likes[]>{
        return from(this.membreRepository.find());
    }

    async findAdresse(id_post:number,adresse: string):Promise<likes> {
        return await this.membreRepository.findOne({
          select: ['id', 'id_post','adresse'],
          where: {
            id_post,
            adresse

          },
        });
      }

      deletlike(id:number):Observable<any>{
        return from(this.membreRepository.delete(id ));
    }




}
