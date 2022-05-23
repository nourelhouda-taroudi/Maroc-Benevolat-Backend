import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { AssociationDTO } from './../../association/dto/association.dto';
export class UserSignUpDTO {
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  @IsNumber()
  phone: number;
  gender: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  association: AssociationDTO;
}
