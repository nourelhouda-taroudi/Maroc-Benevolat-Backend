import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Controller for users')
export class UserController {
    @Get('signIn')
    @ApiOperation({description:'methode to sign in the user '})
    @ApiResponse({status:200,description:'ok'})
    signIn(){
        return true;
    }
    
}
