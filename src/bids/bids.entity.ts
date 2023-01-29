import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Auction } from '../auction/auction.entity';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer' })
  value: string;

  @Column({ type: 'bool', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @ManyToOne(() => User, (User) => User.bids)
  owner: User;

  @ManyToOne(() => Auction, (Auction) => Auction.bids)
  auction: Auction;
}
