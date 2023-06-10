import { Injectable } from '@nestjs/common';
import {  UserModule } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { DbService } from 'src/db/db.service';
import { convertRoleToEnumPrisma } from 'src/utils/converts.utils';
import { HTTP_STATUS_CODE } from 'src/utils/response-filters';
import { CreateUserModuleInput } from './dto/create-user-module.input';
import { UpdateUserModuleInput } from './dto/update-user-module.input';

@Injectable()
export class UserModulesService {

  constructor(private readonly prisma: DbService) {}

  async create(createUserModuleInput: CreateUserModuleInput): Promise<UserModule[]> {
    const {name, roles} = createUserModuleInput;

      const result: UserModule | null = await this.prisma.userModule
      .findFirst({
        where: {
          moduleName: {
            contains: name
          }
        }
      });

      if(result) {
        throw new GraphQLError("Désolé ce module existe déjà", {extensions: {code: HTTP_STATUS_CODE.already_exists, args: ['name']}})
      }

    
      await this.prisma.userModule.create({
        data: {
          moduleName: name,
          roles
        }
      });
      const allModules: UserModule[] = await this.prisma.userModule.findMany({
        where:{
          isActive: true
        }, 
        include: {
        authorizedUsers: {
          where: {
            isActive: true
          },
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            name: 'desc'
          }
        }
      }});
     return allModules;
  }

  

  findAll() {
    return `This action returns all userModules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userModule`;
  }

  update(id: string, updateUserModuleInput: UpdateUserModuleInput) {
    return `This action updates a #${id} userModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} userModule`;
  }
}
