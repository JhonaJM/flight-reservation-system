
import { IsString, IsArray, IsNumber, IsDateString, ValidateNested, Min, Max, IsPositive, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class OriginDestinationDto {

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(9)
  pax: number;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OriginDestinationDetailsDto)
  items: OriginDestinationDetailsDto[];


}

class OriginDestinationDetailsDto {
  @IsString()
  departureCity: string;

  @IsString()
  arrivalCity: string;

  @IsDate()
  @Type(()=> Date )
  departureDate: Date
}

