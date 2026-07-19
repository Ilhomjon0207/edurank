import {IsNumber, IsOptional, IsString, Max, Min} from "class-validator";

export class CreateCriterionDto {

    @IsString()
    name:string;

    @IsOptional()
    @IsString()
    description:string;

    @IsNumber()
    @Min(0)
    @Max(1)
    weight:number;



}
