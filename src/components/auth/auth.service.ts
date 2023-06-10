import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity as UserEntity} from '../users/entities/user.entity';
import { GraphQLError } from 'graphql';
import { UsersService } from '../users/users.service';
import { GraphQLResponse } from 'src/common/response/response.entity';
import { AuthEntity } from './auth.entity';
import { RegisterInput } from './auth.input';
import { HTTP_STATUS_CODE, responseFilter } from 'src/utils/response-filters';
import * as bcrypt from 'bcrypt';




interface PayloadParams {
    userId: string 
    email: string
    role: any
}

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService)) 
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password:string): Promise<UserEntity | null> {
        const user = await this.usersService.findByEmail(email);
       return user;
    }

    async hashPassword(password: string):Promise<string> {
        const saltRound = 10;
        const hash = await bcrypt.hash(password, saltRound);
        return hash;
    }

     genAccessToken(params: PayloadParams) {
        const payload = { userId: params.userId, email: params.email, role: params.role };
       return this.jwtService.sign(payload);
    }

    async register(registerInput: RegisterInput) {

        const user = await this.usersService.findByEmail(registerInput.email);
        if(user) {
            throw new GraphQLError('Un compte utilise déjà cet e-mail. ',{
                extensions: { code: HTTP_STATUS_CODE.already_exists, args: ['email'] }
            })
        }
        registerInput.password = await this.hashPassword(registerInput.password);
        const created = await this.usersService.create(registerInput);
        
        const access_token = this.genAccessToken({
            userId: created.id, 
            email: created.email, 
            role: created.role
        });
         const auth = { 
             access_token, 
             user: created
            } as AuthEntity; 
        
        return {
            ...responseFilter({statusCode: HTTP_STATUS_CODE.created}), 
            result: auth} as GraphQLResponse;
    }

    async login(user: any): Promise<AuthEntity> {
       
        const access_token = this.genAccessToken({
            userId: user.id, 
            email: user.email, 
            role: user.role
            // role: {
            //     ...user.role, 
            //     roleName: convertRoleToEnumGraphQL(user.role.roleName) 
            // } as RoleToUserEntity
        });
        const auth = { access_token, user } as AuthEntity;
        return auth;
    }

}
