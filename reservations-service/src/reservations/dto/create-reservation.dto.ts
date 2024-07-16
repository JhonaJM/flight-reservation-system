import { ReservationStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, IsPositive, IsString, Length, ValidateNested } from "class-validator";
import { v4 as uuidv4 } from 'uuid';
import { PassengerDto, SegmentsDto } from ".";
import { ReservationStatusList } from "enum/reservation.enum";

export class CreateReservationDto {
    
    @IsOptional()
    pnrLocator: string = generatePnrLocator();
    
    // @IsString()
    // @Length(3, 3, { message: 'currency must be at 3 characters ' })
    // currency: string;

    // @IsNumber()
    // @IsPositive()
    // ammount: number;
    
    @IsOptional()
    @IsEnum(ReservationStatusList,{message:`posible status are ${ReservationStatusList}`})
    status: ReservationStatus = ReservationStatus.PENDING;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true}) //validate inside
    @Type(()=>SegmentsDto)
    segments:SegmentsDto[]

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true}) //validate inside
    @Type(()=>PassengerDto)
    passengers:PassengerDto[]

}

function generatePnrLocator(): string {
    return uuidv4().replace(/-/g, '').slice(0, 6).toUpperCase();
}