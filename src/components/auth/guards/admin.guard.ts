import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserRoleEnum } from "@prisma/client";
import { GraphQLError } from "graphql";
import { Observable } from "rxjs";
import { HTTP_STATUS_CODE } from "src/utils/response-filters";

@Injectable()
export class AdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        console.log( ctx.getContext().req.user);
        const isAdmin = ctx.getContext().req.user.role.roleName === UserRoleEnum.Admin;

        if(!isAdmin) {
            throw new GraphQLError('Vous n\êtes pas l\'administrateur', 
                {extensions: {code: HTTP_STATUS_CODE.forbiden}});
        }
        return true; 
        
    }
    
}