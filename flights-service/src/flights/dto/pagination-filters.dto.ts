import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, Length } from "class-validator";
import { PaginationDto } from "src/common/dto";

export class PaginationFiltersDto extends PaginationDto {

    @Length(3, 3, { message: 'currency must be at 3 characters ' })
    @IsOptional()
    @IsString()
    public departureCity: string;

    @Length(3, 3, { message: 'currency must be at 3 characters ' })
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