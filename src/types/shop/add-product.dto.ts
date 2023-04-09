import { IsNumber, IsString } from "class-validator";

export class AddPhotoToProductDto {
    @IsString()
    id: string;
}