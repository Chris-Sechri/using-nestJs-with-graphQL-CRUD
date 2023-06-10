import { createUnionType } from "@nestjs/graphql";
import { UserEntity } from "src/components/users/entities/user.entity";
import { AuthEntity } from "src/components/auth/auth.entity";
import { UserModuleEntity } from "src/components/user-modules/entities/user-module.entity";

/**
 * @description Register all the response types result here.
 */


export const RegistryUnionTypes = createUnionType({
  name: "RegistryUnionTypes",
  types: () => [AuthEntity, UserEntity, UserModuleEntity] as const,

  resolveType(obj) {

    if(obj.access_token){
      return AuthEntity;
    }

    if(obj.email) {
      return UserEntity;
    }

    if(obj.moduleName) {
      return UserModuleEntity;
    }
    
    return null;
  }
})