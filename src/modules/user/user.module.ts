import { CommonModule } from './../common/common.module';
import { Otp } from './entities/otp';
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
  imports: [
    TypeOrmModule.forFeature([User, Otp]),
    AssociationModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    CommonModule,
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
