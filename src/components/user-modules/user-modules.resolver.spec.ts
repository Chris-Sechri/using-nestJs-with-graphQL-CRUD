import { Test, TestingModule } from '@nestjs/testing';
import { UserModulesResolver } from './user-modules.resolver';
import { UserModulesService } from './user-modules.service';

describe('UserModulesResolver', () => {
  let resolver: UserModulesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserModulesResolver, UserModulesService],
    }).compile();

    resolver = module.get<UserModulesResolver>(UserModulesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
