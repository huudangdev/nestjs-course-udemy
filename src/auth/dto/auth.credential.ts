import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsEmail } from "class-validator";

export class AuthCredential {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: "Password too weak"})
  password: string;
}