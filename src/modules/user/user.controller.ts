import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserSignInDTO } from './dto/user-signin.dto';
import { UserService } from './services/user.service';

@Controller('user')
@ApiTags('Controller for users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signIn')
  @ApiOperation({ description: 'methode to sign in the user ' })
  @ApiResponse({ status: 200, description: 'ok' })
  signIn(@Body() userDto: UserSignInDTO) {
    return this.userService.signIn(userDto);
  }
  @Post('signUp')
  @ApiOperation({ description: 'methode to sign up the user ' })
  @ApiResponse({ status: 201, description: 'created' })
  async signUp(@Body() userDto: any) {
    console.log({userDto});
    
    return this.userService.signUp(userDto);
  }
  @Post('forget-password')
  async forgetPassword(@Query('email') email:string){
      return this.userService.forgetPassword(email);
  }
  @Post('otpValidation')
  async otpValidation(@Query('email')email:string,@Query('code') code:string){
      return this.userService.otpValidation(code,email);
  }
  @Put('resetPassword')
  async resetPassword(@Query('email') email:string,@Query('password') password:string){
      return this.userService.resetPassword(email,password);
  }
}
