import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthServices } from 'src/auth/auth.service';
import { jwtConstants } from 'src/constants/constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServices],
  exports: [AuthServices],
})
export class AuthModule {}
