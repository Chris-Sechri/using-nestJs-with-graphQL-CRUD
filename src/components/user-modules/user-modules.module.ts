import { Module } from '@nestjs/common';
import { UserModulesService } from './user-modules.service';
import { UserModulesResolver } from './user-modules.resolver';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [UserModulesResolver, UserModulesService]
})
export class UserModulesModule {}
