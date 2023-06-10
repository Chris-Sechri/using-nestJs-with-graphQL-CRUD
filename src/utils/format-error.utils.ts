import { GraphQLFormattedError } from "graphql";
import { responseFilter } from "./response-filters";
import { unwrapResolverError } from '@apollo/server/errors';


export const gqlFormatErrorUtils = (formattedError: GraphQLFormattedError, error: unknown) => {
    return responseFilter({
        statusCode: formattedError.extensions.code, 
        message: formattedError.message ?? null,
        args: formattedError.extensions.args as string[] ?? []
    });
}