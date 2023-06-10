import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoleToUserModule } from './role-to-user/entities/role-to-user.module';
import { UserModulesModule } from './user-modules/user-modules.module';

@Module({
    imports: [UsersModule, AuthModule, RoleToUserModule, UserModulesModule],
})
export class ComponentsModule {}
