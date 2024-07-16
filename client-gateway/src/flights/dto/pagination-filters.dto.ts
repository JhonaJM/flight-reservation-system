import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, Length } from "class-validator";
import { PaginationDto } from "src/common/dto";

export class PaginationFiltersDto extends PaginationDto {

    @Length(3, 3, { message: 'departureCity must be at 3 IATA code' })
    @IsOptional()
    @IsString()
    public departureCity: string;

    @Length(3, 3, { message: 'arrivalCity must be at 3 IATA code' })
    @IsOptional()
    @IsString()
    public arrivalCity: string;

    @Type(() => Date)
    @IsDate()
    public startDate: Date;

    @Type(() => Date)
    @IsDate()
    public endDate: Date;

}