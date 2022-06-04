import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AdminController } from '../controller/admin.controller';
import { AdminEntity } from '../models/admin.entity';
import { AdminInter } from '../models/admin.interface';
import * as bcrypt from 'bcrypt';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
@Injectable()
export class AdminService {
  
   

constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository : Repository<AdminEntity>){}


createAdmin(admin : AdminInter): Observable<AdminInter>{

    return from(this.adminRepository.save(admin));

}

 async findOne(condition : any ):Promise<AdminInter>{
     return await this.adminRepository.findOne(condition)
      
    
 }


 async findAdmin(email: string, password: string):Promise<AdminInter> {
    return await this.adminRepository.findOne({
      select: ['id', 'name','email','password'],
      where: {
        email,
        password
      },
    });
  }


}
