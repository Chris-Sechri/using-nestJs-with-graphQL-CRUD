import { Module } from '@nestjs/common';
import { RoleToUserService } from '../role-to-user.service';
import { RoleToUserResolver } from '../role-to-user.resolver';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [RoleToUserResolver, RoleToUserService]
})
export class RoleToUserModule {}
