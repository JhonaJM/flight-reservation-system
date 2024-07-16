import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNumber, IsPositive, ValidateNested } from "class-validator";

export class UpdateSeatsDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true}) //validate inside
    public ids: number[];

    @IsInt()
    @IsPositive()
    @Type(() => Number)
    public seats: number;
}