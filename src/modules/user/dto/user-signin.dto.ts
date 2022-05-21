import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator";

export class UserSignInDTO{
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}