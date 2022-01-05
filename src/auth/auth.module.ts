import { UsersModule } from './../users/users.module';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [AuthService, AuthResolver, LocalStrategy]
})
export class AuthModule {}
