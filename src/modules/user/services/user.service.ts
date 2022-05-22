import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AssociationService } from './../../association/services/association.service';
import { UserSignUpDTO } from './../dto/user-register.dto';
import { UserSignInDTO } from './../dto/user-signin.dto';
import { User } from './../entities/user';

@Injectable()
export class UserService {
  constructor(
    private readonly associationService: AssociationService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(userDTO: UserSignUpDTO) {
    const { email, firstname, lastname, gender, password, phone, association } =
      userDTO;
    const newAssiociation = await this.associationService.createAssociation(
      association,
    );
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    let user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.gender = gender;
    user.phone = phone;
    user.password = hash;
    user.association = newAssiociation;
    return this.userRepository.save(user);
  }
  async signIn(userDto: UserSignInDTO) {
    // Check if user existe using email
    const user = await this.findByEmail(userDto.email);
    const isMatch = await bcrypt.compare(userDto.password, user.password);
    // Check password
    if (user && isMatch) {
      // create token
      const payload = { email: user.email, sub: user.id };
      const access_token = await this.jwtService.signAsync(payload);
      const { password, ...result } = user;
      return { user: result, access_token };
    }
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Email ou mot de passe est invalide',
      },
      HttpStatus.FORBIDDEN,
    );
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }
}
