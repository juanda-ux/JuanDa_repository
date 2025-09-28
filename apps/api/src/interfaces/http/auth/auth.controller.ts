import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';

class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return { message: 'Registration placeholder', email: body.email };
  }

  @Post('login')
  async login(@Body() body: RegisterDto) {
    return { token: 'mock-token', email: body.email };
  }
}
