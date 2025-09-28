import { Body, Controller, Param, Post } from '@nestjs/common';
import { IsEmail, IsOptional, IsString, validateSync } from 'class-validator';
import axios from 'axios';

class FormSubmissionDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  message?: string;

  @IsString()
  token!: string;
}

@Controller('forms/submit')
export class FormsController {
  @Post(':formId')
  async submit(@Param('formId') formId: string, @Body() body: FormSubmissionDto) {
    const errors = validateSync(Object.assign(new FormSubmissionDto(), body));
    if (errors.length) {
      return { success: false, errors };
    }

    if (process.env.HCAPTCHA_SECRET_KEY) {
      await axios.post('https://hcaptcha.com/siteverify', {
        response: body.token,
        secret: process.env.HCAPTCHA_SECRET_KEY,
      });
    }

    return { success: true, formId };
  }
}
