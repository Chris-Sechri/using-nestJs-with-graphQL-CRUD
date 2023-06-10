import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';


@InputType()
export class CreateUserInput  {
  @Field()
  name: string
  @Field()
  email: string
  @Field() 
  password: string
}
