import { RoleEnum } from "src/common/enums/user-roles";
import { UserRoleEnum as UserRolePrisma } from '@prisma/client';

export function convertRoleToEnumPrisma(role: RoleEnum) {
    switch(role) {
      case RoleEnum.Admin:
        return UserRolePrisma.Admin;
      case RoleEnum.User:
        return UserRolePrisma.User;
      default:
        return UserRolePrisma.User;

    }
  }

export function convertRoleToEnumGraphQL(role: UserRolePrisma) {
    switch(role) {
        case UserRolePrisma.Admin:
          return RoleEnum.Admin;
        case UserRolePrisma.User:
          return RoleEnum.User;
        default:
          return RoleEnum.User;
  
      }
}