import { Field, ID, InputType, PickType } from "@nestjs/graphql";
import { CreateUserInput } from "../users/dto/create-user.input";

@InputType()
export class RegisterInput extends CreateUserInput {}

@InputType()
export class LoginInput extends PickType(CreateUserInput, ['email', 'password'] as const) {
    @Field(() => ID, {nullable: true})
    id?: string
}