import { Module } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { AuctionService } from '././auction.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auction } from "./auction.entity";
import { ValidationModule } from "../validation/validation.module";
import { FilesModule } from "../files/files.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Auction]),
    ValidationModule,
    FilesModule,
    UserModule,
  ],
  controllers: [AuctionController],
  providers: [AuctionService]
})
export class AuctionModule {}
