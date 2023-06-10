import { Resolver, Query, Mutation, Args, Int, Context, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from '../auth/user.decorator';
import { GraphQLResponse } from 'src/common/response/response.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GraphQLError } from 'graphql';
import { HTTP_STATUS_CODE, responseFilter } from 'src/utils/response-filters';
import { AdminGuard } from '../auth/guards/admin.guard';


@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => GraphQLResponse)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: any, @Context('user') userd: any) {
    if(user instanceof GraphQLError) {
      return user;
    };
    const current = await this.usersService.findOne(user.userId);
    return { ...responseFilter({statusCode: HTTP_STATUS_CODE.found}), result: current }; 
  }

  @Query(() => [UserEntity], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Mutation(() => GraphQLResponse)
  @UseGuards(JwtAuthGuard)
  async updateUser(@CurrentUser() user: any, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      const updatedUser = await this.usersService.update(user.userId , updateUserInput);
      
      return { ...responseFilter({statusCode: HTTP_STATUS_CODE.found, message: 'Utilisateur modifié !'}),
         result: updatedUser as UserEntity } as GraphQLResponse;

    } catch(err) {
       return err;
    }
  }

  @Mutation(() => GraphQLResponse)
  @UseGuards(JwtAuthGuard, AdminGuard)
  async removeUser(@Args('id', { type: () => ID }) id: string) {
    try {
      const deleted = await this.usersService.remove(id);
      return { ...responseFilter({statusCode: HTTP_STATUS_CODE.found, message: 'Utilisateur supprimé !'}), result: deleted as UserEntity } as GraphQLResponse;
    }catch(err) {
      return err;
    }
  }

  @Mutation(() => GraphQLResponse)
  @UseGuards(JwtAuthGuard)
  async deleteMyAccount(@CurrentUser() user: any) {
    try {
      const deleted = await this.usersService.remove(user.id);
      return { ...responseFilter({statusCode: HTTP_STATUS_CODE.found, message: 'Utilisateur supprimé !'}), result: deleted as UserEntity } as GraphQLResponse;
    }catch(err) {
      return err;
    }
  }
}
