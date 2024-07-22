import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString, Length } from "class-validator";

export class SegmentsDto {
    @IsNumber()
    @IsPositive()
    id: number;
    // @IsString()
    // @Length(2, 2, { message: 'airlineCode shoulb be a Iata code' })
    // airlineCode: number;
    // @Length(3, 3, { message: 'departureCity shoulb be a Iata code' })
    // departureCity: string;
    // @Length(3, 3, { message: 'arrivalCity shoulb be a Iata code' })
    // arrivalCity: string;

    // @IsString()
    // @Length(3, 3, { message: 'invalid currency' })
    // currency:string;
    
    // @IsNumber({maxDecimalPlaces : 2})
    // @IsPositive()
    // @Type(() => Number)
    // price: number;

}