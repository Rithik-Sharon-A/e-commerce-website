import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import validator from 'validator';
import { User } from './user.schema';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return { success: false, message: 'User does not exist' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid credentials' };
    }

    const token = this.authService.createUserToken(user._id.toString());
    return { success: true, token };
  }

  async register(name: string, email: string, password: string) {
    const exists = await this.userModel.findOne({ email });
    if (exists) {
      return { success: false, message: 'User already exists' };
    }

    if (!validator.isEmail(email)) {
      return { success: false, message: 'Please enter a valid email' };
    }

    if (password.length < 8) {
      return { success: false, message: 'Please enter a strong password' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.authService.createUserToken(user._id.toString());
    return { success: true, token };
  }

  async adminLogin(email: string, password: string, adminEmail: string, adminPassword: string) {
    if (email === adminEmail && password === adminPassword) {
      const token = this.authService.createAdminToken();
      return { success: true, token };
    }
    return { success: false, message: 'Invalid credentials' };
  }
}
