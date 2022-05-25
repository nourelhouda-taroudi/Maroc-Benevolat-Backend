import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { AssociationDTO } from './../../association/dto/association.dto';
export class UserSignUpDTO {
  @IsNotEmpty({message:"Entrer votre Prenom"})
  firstname: string;
  @IsNotEmpty({message:"Entrer votre Nom"})
  lastname: string;
  @IsNotEmpty({message:"Entrer votre numéro de téléphone"})
  @IsNumber({maxDecimalPlaces:10},{message:"Ce champ doit contenir des nombre"})
  phone: number;
  gender: string;
  @IsEmail({message:"Ce champ doit contenir email"})
  email: string;
  @IsNotEmpty({message:"Taper un mot de passe"})
  password: string;
  association: AssociationDTO;
}
