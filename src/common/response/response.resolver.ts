import { Query, Resolver } from '@nestjs/graphql';
import { GraphQLResponse } from './response.entity';
import { ResponseService } from './response.service';

@Resolver(()=> GraphQLResponse)
export class ResponseResolver {
  constructor(private readonly responseService: ResponseService) {}

  @Query(() => [GraphQLResponse])
  getResponseDemo() {
    return {status: 200, message: 'this is an example of response'} as GraphQLResponse;
  }
}
