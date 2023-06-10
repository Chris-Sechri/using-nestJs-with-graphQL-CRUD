import { CreateRoleToUserInput } from './create-role-to-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleToUserInput extends PartialType(CreateRoleToUserInput) {
  @Field(() => Int)
  id: number;
}
