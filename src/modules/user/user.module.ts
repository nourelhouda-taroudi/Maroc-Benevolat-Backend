import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from './../constants/jwt-constants';
import { AssociationModule } from './../association/association.module';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { User } from './entities/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        AssociationModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),
    ],
    providers:[
        UserService,
        JwtStrategy
    ],
    controllers:[
        UserController
    ]
    
})
export class UserModule {}
