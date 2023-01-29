import { Module } from '@nestjs/common';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Bid } from "./bids.entity";
import {ValidationModule} from "../validation/validation.module";
import {UserModule} from "../user/user.module";
import {AuctionModule} from "../auction/auction.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Bid]),
    ValidationModule,
    UserModule,
    AuctionModule,
  ],
  controllers: [BidsController],
  providers: [BidsService]
})
export class BidsModule {}
