import {ApiProperty} from "@nestjs/swagger";
import {IsInt, Max, Min} from "class-validator";

export class UpdateUserSkillDto {

    @ApiProperty({
        example: 5,
    })
    @IsInt()
    @Min(1)
    @Max(5)
    level: number;
}