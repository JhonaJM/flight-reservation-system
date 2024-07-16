import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNumber, IsPositive, IsString, Length, Matches, ValidateNested } from "class-validator";

export class PaymentSessionDto {

    @IsString()
    reservationId: string;
    @IsString()
    pnrLocator: string;
    @Length(3,3,{message:'currency code is not accepted'})
    @IsString()
    currency: string;

    @IsInt()
    @IsPositive()
    pax: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => PaymentSessionItemDto)
    items: PaymentSessionItemDto[];


}

export class PaymentSessionItemDto {
    @Matches(/^[A-Z]{3}\/[A-Z]{3}$/, { message: 'itinerary should be in the format "AAA/BBB"' })
    @IsString()
    itinerary:string;
    

    @IsNumber()
    @IsPositive()
    price:number;

}