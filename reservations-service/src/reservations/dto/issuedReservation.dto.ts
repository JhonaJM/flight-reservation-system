import { IsString, IsUrl, IsUUID } from "class-validator";

export class IssuedReservationDto {

    @IsString()
    stripePaymentId: string;

    @IsUUID()
    @IsString()
    reservationId: string;

    @IsUrl()
    @IsString()
    receiptUrl: string;
}