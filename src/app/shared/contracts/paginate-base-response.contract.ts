import { ApiProperty } from "@nestjs/swagger";

export class PaginateBaseResponseContract<T> {
    @ApiProperty()
    page: number;

    @ApiProperty()
    size: number;

    @ApiProperty()
    total: number;

    @ApiProperty()
    lastPage: number;

    @ApiProperty({ type: [Object] })
    data: T[];
}