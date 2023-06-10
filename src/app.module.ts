import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ComponentsModule } from './components/components.module';
import { DbModule } from './db/db.module';
import { ResponseModule } from './common/response/response.module';
import { GraphQLFormattedError } from 'graphql';
import { gqlFormatErrorUtils } from './utils/format-error.utils';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      formatError: (formattedError: GraphQLFormattedError, error: unknown) => gqlFormatErrorUtils(formattedError, error),
    }),
    DbModule,
    ComponentsModule,
    ResponseModule,
  ],
})
export class AppModule {}
