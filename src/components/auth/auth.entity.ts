import { Extensions, Field, ObjectType } from "@nestjs/graphql";
import { UserEntity } from "../users/entities/user.entity";

@ObjectType()
export class AuthEntity {
    @Field()
    @Extensions({role: "ok"})
    access_token: string;
    @Field(() => UserEntity)
    user: UserEntity
}