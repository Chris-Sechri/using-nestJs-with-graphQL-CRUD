import { Field, Int, InterfaceType } from "@nestjs/graphql";

@InterfaceType()
export abstract class GrapQLCustomResponse {
    @Field(() => Int)
    status: number
    @Field({nullable: true})
    message?: string
}