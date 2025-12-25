import { ListProductDto } from "@/application/product/dtos/list-product.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class ListProductNestDto implements ListProductDto {
  @ApiProperty({
    description: "Page number",
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty({ message: "Page is required" })
  @IsNumber({}, { message: "Page must be a number" })
  @Min(1, { message: "Page must be at least 1" })
  @Transform(({ value }) => Number(value))
  page: number;

  @ApiProperty({
    description: "Limit number of items per page",
    example: 10,
    minimum: 1,
  })
  @IsNotEmpty({ message: "Limit is required" })
  @IsNumber({}, { message: "Limit must be a number" })
  @Min(1, { message: "Limit must be at least 1" })
  @Transform(({ value }) => Number(value))
  limit: number;
}
