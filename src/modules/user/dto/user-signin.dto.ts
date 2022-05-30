import { IsEmail, IsEmpty, IsNotEmpty, MinLength } from "class-validator";

export class UserSignInDTO{
    @IsEmail({message:"Format d'email n'est pas valide"})
    @IsNotEmpty({message:"Email ne doit pas être vide "})
    email: string;
    @IsNotEmpty({message:"Mot de passei- ne doit pas être vide "})
    @MinLength(6,{message: "Mot de passe est court(6 caractére minimum)"})
    password: string;
}