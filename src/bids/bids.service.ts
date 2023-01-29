import { Injectable } from '@nestjs/common';
import { Bid } from "./bids.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../user/user.service";
import { AuctionService } from "../auction/auction.service";
import { Repository } from "typeorm";
import { Request } from 'express';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private readonly bid: Repository<Bid>,
    private readonly userService: UserService,
    private readonly auctionService: AuctionService,
  ) {}

  async create(req: Request, data): Promise<any> {
    const userId = await this.userService.getUserIdByToken(req);
    const auctionId = await this.auctionService.findOne({ id: data.auctionId })
    return await this.bid.save({
      ...data,
      owner: userId,
      auction: auctionId,
    });
  }

  findOne(where: object): Promise<Bid> {
    // TODO send only id and username owner properties
    return this.bid.findOne({
      where: {
        ...where,
        isDeleted: false,
      },
      relations: ['owner'],
    });
  }

  findAll(were: object): Promise<Bid[]> {
    // TODO send only id and username owner properties
    return this.bid.find({
      where: { isDeleted: false, ...were },
      relations: ['owner'],
    });
  }
}

