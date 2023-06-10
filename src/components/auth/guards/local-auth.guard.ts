import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { GraphQLError } from "graphql";
import { HTTP_STATUS_CODE } from "src/utils/response-filters";



@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

      getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext().req;
        const {
          loginInput: { email, password },
        } = ctx.getArgs();
        
        gqlReq.body.email = email;
        gqlReq.body.password = password;
        return gqlReq;
      }

    handleRequest(err: any, user:any, info:any) {
          // You can throw an exception based on either "info" or "err" arguments
          if (err || !user) {
            throw new GraphQLError("Nous n'avons pas pu trouver ce compte.", 
              { extensions: {code: HTTP_STATUS_CODE.not_found}});
          }else {
            return user; 
          }
      }
}