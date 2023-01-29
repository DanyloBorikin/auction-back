import { Injectable } from '@nestjs/common';
import { Auction } from "./auction.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../user/user.service";
import { Repository } from "typeorm";
import { Request } from 'express';

@Injectable()
export class AuctionService {
  constructor(
  @InjectRepository(Auction)
  private readonly auction: Repository<Auction>,
  private readonly userService: UserService,
) {}

  async create(req: Request, data: object): Promise<any> {
    const userId = await this.userService.getUserIdByToken(req);
    return await this.auction.save({
      ...data,
      owner: userId,
    });
  }

  findOne(where): Promise<Auction> {
    // TODO send only id and username owner properties
    return this.auction.findOne({
      where: {
        ...where,
        isDeleted: false,
      },
      relations: ['owner', 'bids'],
    });
  }

  findAll(): Promise<Auction[]> {
    // TODO send only id and username owner properties
    return this.auction.find({
      where: { isDeleted: false },
      relations: ['owner'],
    });
  }
}

