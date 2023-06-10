import { InputType, Int, Field, OmitType, HideField, PartialType, PickType } from '@nestjs/graphql';
import { RoleEnum } from 'src/common/enums/user-roles';


@InputType()
export class CreateUserModuleInput {
  @Field()
  name: string;
  @Field(() => [RoleEnum])
  roles: RoleEnum[]
}
