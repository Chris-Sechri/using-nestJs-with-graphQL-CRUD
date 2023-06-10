import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { RoleEnum } from 'src/common/enums/user-roles';
import { UserEntity } from 'src/components/users/entities/user.entity';

@ObjectType()
export class UserModuleEntity {
  @Field(() => ID, { description: 'unique module Id' })
  id: string;
  @Field()
  moduleName: string
  @Field(()=> [RoleEnum], {nullable: "itemsAndList"})
  roles: RoleEnum[]
  @Field(() => [UserEntity], {nullable: "itemsAndList"})
  authorizedUsers?: UserEntity[]
  
} 