import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as otpGenerator from 'otp-generator';
import { from, Observable } from 'rxjs';
import { DemandesService } from 'src/demandes/services/demandes.service';
import { MailService } from 'src/modules/common/services/mail/mail.service';
import { Repository } from 'typeorm';
import { UserInter } from '../entities/user.interface';
import { UserSignUpDTO } from './../dto/user-register.dto';
import { UserSignInDTO } from './../dto/user-signin.dto';
import { Otp } from './../entities/otp';
import { User } from './../entities/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly mailServicce: MailService,
    private readonly demandesService: DemandesService
  ) {}
  async signUp(userDTO: UserSignUpDTO) {
    return this.demandesService.createUserDemande(userDTO);
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
    
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Email est invalide',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
  async forgetPassword(email: string) {
    const user = await this.findByEmail(email);
  
    // const otpGenerator=require('otp-generator');
    const code = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    console.log(code);
    const otp = new Otp();
    otp.code = code;
    otp.user = user;
    this.otpRepository.save(otp);
    return this.mailServicce.sendOtp(
      email,
      'Code de vérification : Pour réinitialiser mot de passe',
      user.firstname + ' ' + user.lastname,
      code,
    );
  }
  //en param otp,email de utilisateur
  async otpValidation(code: string, email: string) {
    console.log(email);
    if(!code){
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Code est obligatoire',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if(!email){
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Email est obligatoire',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
        //step1:get user by email
    const user = await this.findByEmail(email);
    //STEP2:get otp by otpString
    const otp = await this.otpRepository.findOne({
      where: { code },
      relations: ['user'],
    });
    if (!otp) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Code est invalid',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    //STEP3: compare de user with  otp user (if == otp valide sinon 403)

    if (user.id == otp.user.id) {
      return { message: 'Code est valide' };
    }
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Code est invalid',
      },
      HttpStatus.FORBIDDEN,
    );
  }
  //prend en param email,nouveauPassword
  async resetPassword(email: string, newPassword: string) {
    //GET user by email
    const user = await this.findByEmail(email);
    //update user password(before insert hash password)
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(newPassword, saltOrRounds);
    user.password = hash;
    await this.userRepository.save(user);
    return { message: 'Mot de passe est réinitialisé' };
  }


  


createUser(user : UserInter): Observable<UserInter>{

    return from(this.userRepository.save(user));

}
}
