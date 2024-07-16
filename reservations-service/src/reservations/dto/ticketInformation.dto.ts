import { IsString } from "class-validator";
import { number } from "joi";

export class TicketInformationDto {

    @IsString()
    number : string;

}