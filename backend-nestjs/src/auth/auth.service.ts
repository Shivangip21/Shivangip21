import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private redis = new Redis();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async requestOtp(mobile: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.redis.set(`otp:${mobile}`, otp, 'EX', 300);
    console.log(`OTP for ${mobile}: ${otp}`);
    return { message: 'OTP sent (simulated)' };
  }

  async verifyOtp(mobile: string, otp: string) {
    const storedOtp = await this.redis.get(`otp:${mobile}`);
    if (storedOtp === otp) {
      let user = await this.userRepository.findOne({ where: { mobile } });
      if (!user) {
        user = this.userRepository.create({ mobile });
        await this.userRepository.save(user);
      }

      const token = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '1h' });
      await this.redis.del(`otp:${mobile}`);
      return { token };
    }
    return { error: 'Invalid OTP' };
  }
}
