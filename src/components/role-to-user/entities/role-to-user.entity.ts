import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { RoleEnum } from 'src/common/enums/user-roles';

@ObjectType()
export class RoleToUserEntity {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;
  @Field(() => RoleEnum)
  roleName: RoleEnum
}
