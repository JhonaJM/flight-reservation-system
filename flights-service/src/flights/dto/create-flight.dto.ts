import { IsString, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFlightDto {
    @IsString()
    public airlineCode: string;

    @IsString()
    public departureCity: string;

    @IsString()
    public arrivalCity: string;

    @IsString()
    public dateFlight: Date;
    @IsString()
    public flightNumber: string;

    @IsString()
    public departureHour: string;
    @IsString()
    public arrivalHour: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public availableSeats: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public price: number;
}
