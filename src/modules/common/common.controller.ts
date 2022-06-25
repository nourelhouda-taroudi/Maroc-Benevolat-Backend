import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { extname } from 'path';

@Controller('common')
export class CommonController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('image',
  ))
  uploadFile(@UploadedFile() image: Express.Multer.File) {
    const response = {
    	filename: image.filename,
    };
    return response;
  }
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
  
}

