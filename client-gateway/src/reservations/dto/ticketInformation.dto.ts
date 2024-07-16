import { IsString } from "class-validator";

export class TicketInformationDto {

    @IsString()
    number : string;

}