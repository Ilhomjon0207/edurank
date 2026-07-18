import {IsInt} from "class-validator";

export class CreateApplicationDto {

    @IsInt()
    JobId: number;
}
