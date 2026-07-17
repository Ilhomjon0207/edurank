import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreateSkillDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}