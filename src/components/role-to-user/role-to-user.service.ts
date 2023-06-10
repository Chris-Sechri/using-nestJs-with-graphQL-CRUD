import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CreateRoleToUserInput } from './dto/create-role-to-user.input';
import { UpdateRoleToUserInput } from './dto/update-role-to-user.input';

@Injectable()
export class RoleToUserService {}
