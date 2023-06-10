import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RoleToUserEntity } from 'src/components/role-to-user/entities/role-to-user.entity';
import { UserModuleEntity } from 'src/components/user-modules/entities/user-module.entity';


@ObjectType()
export class UserEntity {
  @Field(() => ID)
  id: string;
  @Field()
  name: string
  @Field()
  email: string
  @Field()
  password: string
  @Field({nullable: true})
  roleId?: string
  @Field(() => RoleToUserEntity,{nullable: true})
  role?: RoleToUserEntity
  @Field(() => [UserModuleEntity], {nullable: 'items'})
  userModules?: UserModuleEntity[]
}


// @ObjectType({
//   implements: () => SuccessOrFailureResponse
// })
// export class UserResponse {
//   @Field(() => User)
//   result?: User[] | User
// }