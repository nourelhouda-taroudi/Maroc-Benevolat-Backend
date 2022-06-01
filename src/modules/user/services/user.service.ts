import { Otp } from './../entities/otp';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AssociationService } from './../../association/services/association.service';
import { UserSignUpDTO } from './../dto/user-register.dto';
import { UserSignInDTO } from './../dto/user-signin.dto';
import { User } from './../entities/user';
import * as otpGenerator from 'otp-generator';
import { MailService } from 'src/modules/common/services/mail/mail.service';
import { UserInter } from '../entities/user.interface';
import { from, Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private readonly associationService: AssociationService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly mailServicce:MailService
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
  async forgetPassword(email:string){
    const user=await this.findByEmail(email);
    if(!user){
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Email est invalide',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // const otpGenerator=require('otp-generator');
    const code=otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    console.log(code);
    const otp=new Otp();
    otp.code=code;
    otp.user=user;
    this.otpRepository.save(otp);
    return this.mailServicce.example();
    
  }
  resetPassword(){

  }


  


createUser(user : UserInter): Observable<UserInter>{

    return from(this.userRepository.save(user));

}

  
}
