import { Test, TestingModule } from '@nestjs/testing';
import { RoleToUserResolver } from './role-to-user.resolver';
import { RoleToUserService } from './role-to-user.service';

describe('RoleToUserResolver', () => {
  let resolver: RoleToUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleToUserResolver, RoleToUserService],
    }).compile();

    resolver = module.get<RoleToUserResolver>(RoleToUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
