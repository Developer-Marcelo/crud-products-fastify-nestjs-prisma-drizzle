import { CreateProductDto as AppCreateProductDto } from "@/application/product/dtos/create-product.dto";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
} from "class-validator";

export class CreateProductNestDto implements AppCreateProductDto {
  @ApiProperty({
    description: "Product name",
    example: "Product 1",
    minLength: 3,
    maxLength: 120,
  })
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  @MinLength(3, { message: "Name must be at least 3 characters long" })
  @MaxLength(120, { message: "Name must be at most 120 characters long" })
  name: string;

  @ApiProperty({ description: "Product price", example: 100.0, minimum: 0.01 })
  @IsNotEmpty({ message: "Price is required" })
  @IsNumber({}, { message: "Price must be a number" })
  @Min(0.01, { message: "Price must be at least 0.01" })
  price: number;
}
