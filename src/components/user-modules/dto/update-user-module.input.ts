import { CreateUserModuleInput } from './create-user-module.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserModuleInput extends PartialType(CreateUserModuleInput) {
  @Field(() => ID)
  id: string
}
