import { IsEmail, IsEmpty, IsNotEmpty, MinLength } from "class-validator";

export class UserSignInDTO{
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @MinLength(6,{message: "Mot de passe est court(6 caractére minimum)"})
    password: string;
}