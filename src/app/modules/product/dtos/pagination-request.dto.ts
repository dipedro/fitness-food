import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsInt, Min } from "class-validator";

export class PaginateRequestDTO {
    @ApiProperty({ required: false, minimum: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @ApiProperty({ required: false, minimum: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    size?: number = 10;
}