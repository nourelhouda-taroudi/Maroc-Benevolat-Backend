import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { create } from 'domain';
import { from, Observable } from 'rxjs';
import { AdminInter } from '../models/admin.interface';
import { AdminService } from '../service/admin.service';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
import { userInfo } from 'os';
import { User } from 'src/modules/user/entities/user';
import { map } from 'rxjs/operators';
@Controller('admin')
export class AdminController {


    constructor(private adminService : AdminService){}


    @Post()
    create(@Body() admin : AdminInter) : Observable<AdminInter>{
        return this.adminService.createAdmin(admin);


    }


    @Post('/login')
    findOne( @Body('email') email: string,
    @Body('password') password: string) {
  
        return this.adminService.findAdmin(email,password);
    }

   


}
