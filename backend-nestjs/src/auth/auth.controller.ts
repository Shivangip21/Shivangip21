import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  async requestOtp(@Body('mobile') mobile: string) {
    return this.authService.requestOtp(mobile);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { mobile: string; otp: string }) {
    return this.authService.verifyOtp(body.mobile, body.otp);
  }
}