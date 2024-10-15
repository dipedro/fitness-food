import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginateBaseResponseContract } from '../contracts/paginate-base-response.contract';


export const PaginatedApiResponse = <DataDto extends Type<unknown>>(
    dataDto: DataDto,
) =>
    applyDecorators(
        ApiExtraModels(PaginateBaseResponseContract, dataDto),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(PaginateBaseResponseContract) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(dataDto) },
                            },
                            page: {
                                type: 'number',
                                example: 1,
                            },
                            size: {
                                type: 'number',
                                example: 10,
                            },
                            lastPage: {
                                type: 'number',
                                example: 1,
                            },
                            total: {
                                type: 'number',
                                example: 1,
                            },
                        },
                    },
                ],
            },
        }),
    );
