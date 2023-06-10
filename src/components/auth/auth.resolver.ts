import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLResponse } from 'src/common/response/response.entity';
import { CurrentUser } from './user.decorator';
import { AuthEntity } from './auth.entity';
import { LoginInput, RegisterInput } from './auth.input';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { HTTP_STATUS_CODE, responseFilter } from 'src/utils/response-filters';


@Resolver(() => AuthEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }
  @Mutation(() => GraphQLResponse, { name: 'userRegister'})
    async register(@Args('registerInput') registerInput: RegisterInput) {
      try {
        return await this.authService.register(registerInput);
      } catch(err) {
        return err;
      }
    } 

  @Mutation(() => GraphQLResponse, {name: 'login'})
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: any, @Args('loginInput') loginInput: LoginInput) {
    try { 
      const auth = await this.authService.login(user);
      return {...responseFilter({statusCode: HTTP_STATUS_CODE.found}), result: auth } as GraphQLResponse;
    }catch(err) {
      return err;
    }
  }  
}


 