import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { PassengerDto, SegmentsDto } from ".";

export class CreateReservationDto {
    
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
