import { ConfigService } from '@nestjs/config';
import { User } from './../../../user/entities/user';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService,private readonly config:ConfigService) {}
    //PREND en paramétre email et subject et userName
    public sendOtp(email:string,subject:string,userName:string,code:string): void {
        this.mailerService
          .sendMail({
            to: email,
            from: this.config.get('EMAIL'),
            subject: subject,
            template: 'forgetPassword', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
            context: {
              // Data to be sent to template engine.
              code: code ,
              username: userName,
            },
          })
          .then(() => {console.log("email sended");
          })
          .catch((error) => {console.log(error);
          });
      }
}
