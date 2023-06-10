import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserModulesService } from './user-modules.service';
import { UserModuleEntity } from './entities/user-module.entity';
import { CreateUserModuleInput } from './dto/create-user-module.input';
import { UpdateUserModuleInput } from './dto/update-user-module.input';
import { GraphQLResponse } from 'src/common/response/response.entity';
import { UserModule } from '@prisma/client';
import { convertRoleToEnumGraphQL } from 'src/utils/converts.utils';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';


@Resolver(() => UserModuleEntity)
export class UserModulesResolver {
  constructor(private readonly userModulesService: UserModulesService) {}

  @Mutation(() => GraphQLResponse)
  @UseGuards(JwtAuthGuard, AdminGuard)
  async createUserModule(@Args('createUserModuleInput') createUserModuleInput: CreateUserModuleInput) {
    try {
      const modules = await this.userModulesService.create(createUserModuleInput);
      return { 
        status: 201, 
        message: 'Ce module a été ajouté !', 
        results: [
          ...modules.map((e: UserModule) => 
            ({...e, roles: [...e.roles.map((e) => convertRoleToEnumGraphQL(e))]})
          )]
         } as GraphQLResponse;
    }catch(err) {
       return err;
    }
  }

  @Query(() => [UserModuleEntity], { name: 'userModules' })
  findAll() {
    return this.userModulesService.findAll();
  }

  @Query(() => UserModuleEntity, { name: 'userModule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userModulesService.findOne(id);
  }

  @Mutation(() => UserModuleEntity)
  updateUserModule(@Args('updateUserModuleInput') updateUserModuleInput: UpdateUserModuleInput) {
    return this.userModulesService.update(updateUserModuleInput.id, updateUserModuleInput);
  }

  @Mutation(() => UserModuleEntity)
  removeUserModule(@Args('id', { type: () => Int }) id: number) {
    return this.userModulesService.remove(id);
  }
}
