import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { User } from './entities/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports:[
        TypeOrmModule.forFeature([User])
    ],
    providers:[
        UserService
    ],
    controllers:[
        UserController
    ]
})
export class UserModule {}
