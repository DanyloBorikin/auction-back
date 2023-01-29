import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateBidDto {
  @ApiProperty({ example: 1000000, description: 'Value of the bid' })
  @IsInt()
  @Min(10)
  value: number;

  @ApiProperty({ example: 'sdsd23sd', description: 'Auction id' })
  @IsString()
  auctionId: string;
}
