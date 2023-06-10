import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { DbService } from 'src/db/db.service';
import { HTTP_STATUS_CODE } from 'src/utils/response-filters';
import { AuthService } from '../auth/auth.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';


@Injectable()
export class UsersService {

  constructor(
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    private prisma: DbService) {}

  async findByEmail(email: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email }, 
      include: {role: true}
    });
    return user;
  }

  async create(createUserInput: CreateUserInput): Promise<any> {

    const {name, email, password} = createUserInput;
    
      const id = (await this.prisma.user.create({
        data: {
          name,
          email,
          password,
          role: {
            create: {
              roleName: 'User'
            },
          }
        }, 
      })).id;

      const user = await this.prisma.user.findUnique({
        where: { id }, 
        include: {role: true} 
      });
      return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({where: { id }});
    if(!user) throw new GraphQLError('Désolé, ce compte n\'existe pas', {extensions: {code: HTTP_STATUS_CODE.not_found}});

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<any> {
    const { name, email } = updateUserInput;

    const found = await this.findOne(id);
    console.log(found);

  
    const user = await this.prisma.user.update({
      where: {id}, data: { 
          name,
          email
       }, 
      include: {role: true}
    })
    return user;
  } 

  async remove(id: string): Promise<any> {
    const deletedUser = await this.prisma.user.delete({where: { id }}).catch((e) => console.log(e));
    return deletedUser;
  }
}
