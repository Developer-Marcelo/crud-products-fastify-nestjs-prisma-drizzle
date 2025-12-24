import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateProductDto implements UpdateProductDto {
  @IsOptional({ message: "Name is optional" })
  @IsString({ message: "Name must be a string" })
  @MaxLength(120, { message: "Name must be 120 characters long" })
  @ApiProperty({ description: "Product name" })
  name?: string;
  price?: number;
  quantity?: number;
}
