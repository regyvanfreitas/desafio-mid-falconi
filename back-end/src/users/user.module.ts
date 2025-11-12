import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileModule } from '../profiles/profile.module';

@Module({
  imports: [ProfileModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
