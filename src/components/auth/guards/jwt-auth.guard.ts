import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { GraphQLError } from "graphql";
import { HTTP_STATUS_CODE } from "src/utils/response-filters";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    
    constructor() {
        super();
    }
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }

    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
            if(err || !user) {
                throw new GraphQLError('Vous n\êtes pas autorisé à traiter cette opération',
                  {extensions:{code: HTTP_STATUS_CODE.unauthorized}});
             }
             return user;
    }
}

