import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { isEmail } from 'class-validator';
import { assert, define, object, refine, size, string } from 'superstruct';
import { check, validationResult } from "express-validator";
import { GraphQLError } from "graphql";
import { HTTP_STATUS_CODE } from "../response-filters";

@Injectable()
export class AuthRegisterValidator implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        try {
            
            check('name').not().isEmpty().withMessage('Hummm');
            console.log("ok ok")
            validationResult(req).throw();
          }catch(err) {
            throw new GraphQLError('', {extensions: {code: HTTP_STATUS_CODE.bad_request}})
          }

          return next.handle();
        
    }
    
}