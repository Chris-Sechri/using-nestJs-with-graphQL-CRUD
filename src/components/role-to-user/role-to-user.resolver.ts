import { Resolver } from '@nestjs/graphql';
import { RoleToUserEntity } from './entities/role-to-user.entity';


@Resolver(() => RoleToUserEntity)
export class RoleToUserResolver {}
