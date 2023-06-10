import { allResponses } from "./all-responses.utils";


interface ResponseFilterParams {
    statusCode: any
    message?: string 
    args?: string[]
}

export const HTTP_STATUS_CODE = {
    found: 'found',
    already_exists: 'already_exists',
    created: 'created',
    not_found: 'not_found',
    unauthorized: 'unauthorized',
    forbiden: 'forbiden',
    bad_request: 'bad_request',
    internal_server_error: 'internal_server_error'
};



const getStatus = (params: ResponseFilterParams) => allResponses[params.statusCode]['status'];
const getMessage = (params: ResponseFilterParams) => allResponses[params.statusCode]['message'];
const getError = (params: ResponseFilterParams) => allResponses[params.statusCode]['status'] >= 400;

export const responseFilter = (params: ResponseFilterParams) => {
    console.log(params.statusCode);
    return { 
     status: getStatus(params),
     message: params.message ?? getMessage(params),
     args: params.args,
     isError: getError(params)
    }
}







