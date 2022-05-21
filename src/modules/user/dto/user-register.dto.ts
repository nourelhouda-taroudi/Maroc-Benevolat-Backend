import { AssociationDTO } from './../../association/dto/association.dto';
export class UserSignUpDTO {
  firstname: string;
  lastname: string;
  phone: number;
  gender: string;
  email: string;
  password: string;
  association: AssociationDTO;
}
