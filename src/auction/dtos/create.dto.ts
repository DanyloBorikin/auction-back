import { IsString, IsInt, Min } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateAuctionDto {
  @ApiProperty({ example: 'Very old coin', description: 'Title of the auction' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Some description', description: 'Description of the auction' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1000000, description: 'Start price' })
  @IsInt()
  @Min(10)
  startPrice: number;

  @ApiProperty({ example: 1000, description: 'Bid step' })
  @IsInt()
  @Min(1)
  step: number;

  @ApiProperty({ example: '22.11.2023 12:00', description: 'Start date of the auction' })
  @IsString()
  startDate: string;

  @ApiProperty({ example: '23.11.2023 12:00', description: 'End date of the auction' })
  @IsString()
  endDate: string;
}
