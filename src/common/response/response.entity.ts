import { Directive, Field, ObjectType } from "@nestjs/graphql";
import { RegistryUnionTypes } from "src/common/response-unions";
import { GrapQLCustomResponse } from "../interfaces/response.interface";


@ObjectType({
    implements: () => GrapQLCustomResponse
})
export class GraphQLResponse {
    @Field(() => RegistryUnionTypes, {nullable: true})
    @Directive("@skip(if: results)")
    result?: any
    @Field(() => [RegistryUnionTypes], {nullable: "itemsAndList"})
    @Directive("@skip(if: result)")
    results?: any
}