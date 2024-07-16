import { TypeIdentification } from "@prisma/client";
import { IsEnum, IsString, Length } from "class-validator";
import { TypeIdentificationList } from "enum/reservation.enum";

export class PassengerDto {

    @IsString()
    @Length(2, 20, { message: '' })
    giveName: string;

    @IsString()
    @Length(2, 20, { message: '' })
    surName: string;
    @IsEnum(TypeIdentificationList, { message: `posible tyoe identification are ${TypeIdentificationList}` })
    identification: TypeIdentification;// = TypeIdentification.DNI;

    @IsString()
    @Length(8, 12, { message: '' })
    documentNumber: string;
    
    @IsString()
    @Length(3, 3, { message: '' })
    typeCode: string;

}