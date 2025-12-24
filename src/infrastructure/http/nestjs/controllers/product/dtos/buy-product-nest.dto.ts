import { BuyProductDto } from "@/application/product/dtos/buy-product.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class BuyProductNestDto implements BuyProductDto {
  @IsNotEmpty({ message: "Product ID is required" })
  @IsString({ message: "Product ID must be a string" })
  @MaxLength(36, { message: "Product ID must be 36 characters long" })
  @ApiProperty({ description: "Product ID" })
  id: string;

  @IsNotEmpty({ message: "Quantity is required" })
  @IsNumber(
    { maxDecimalPlaces: 0, allowInfinity: false },
    { message: "Quantity must be an integer" }
  )
  @ApiProperty({ description: "Quantity to buy", example: 10 })
  quantity: number;
}
