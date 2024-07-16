import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightDto } from './create-flight.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {
@IsNumber()
@IsPositive()
id : number;

}
