import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../user/user.entity';

@Entity()
export class Auction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'integer' })
    startPrice: string;

    @Column({ type: 'integer' })
    step: string;

    @Column({ type: 'varchar' })
    startDate: string;

    @Column({ type: 'varchar' })
    endDate: string;

    @Column({ type: 'bool', default: false })
    isFinished: boolean;

    @Column({ type: 'bool', default: false })
    isDeleted: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: string;

    @ManyToOne(() => User, (User) => User.auctions)
    owner: User;
}