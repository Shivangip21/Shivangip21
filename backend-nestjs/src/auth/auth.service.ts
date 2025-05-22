import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private redis = new Redis();

  async requestOtp(mobile: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.redis.set(`otp:${mobile}`, otp, 'EX', 300); // 5 min TTL
    console.log(`OTP for ${mobile}: ${otp}`);
    return { message: 'OTP sent (simulated)' };
  }

  async verifyOtp(mobile: string, otp: string) {
    const storedOtp = await this.redis.get(`otp:${mobile}`);
    if (storedOtp === otp) {
      const token = jwt.sign({ mobile }, 'secret-key', { expiresIn: '1h' });
      await this.redis.del(`otp:${mobile}`);
      return { token };
    }
    return { error: 'Invalid OTP' };
  }
}
