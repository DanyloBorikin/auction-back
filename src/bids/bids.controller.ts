import {
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  Req,
  Body,
  Param,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { BidsService } from './bids.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBidDto } from './dto/bid.dto';
import { ValidationService } from '../validation/validation.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Bids')
@Controller('bids')
export class BidsController {
  constructor(
    private readonly bidsService: BidsService,
    private readonly validationService: ValidationService,
  ) {}

  @ApiOperation({ summary: 'Get auctions list' })
  @ApiResponse({ status: 200, type: [CreateBidDto] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    return res.status(200).json(await this.bidsService.findAll({}));
  }

  @ApiOperation({ summary: 'Get auction by id' })
  @ApiResponse({ status: 200, type: CreateBidDto })
  @UseGuards(JwtAuthGuard)
  @Get('/auction/:id')
  getBidsForAuctionId(@Param('id') id: number) {
    return this.bidsService.findAll({ auction: id });
  }

  @ApiOperation({ summary: 'Create auction' })
  @ApiResponse({ status: 200, type: CreateBidDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: Request,
    @Body() createDto: CreateBidDto,
    @Res() res: Response,
  ) {
    const errors = await this.validationService.validate(
      CreateBidDto,
      createDto,
    );

    if (errors.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid fields',
        errors,
      });
    }

    await this.bidsService.create(req, {
      ...createDto,
    });

    const bidsList = await this.bidsService.findAll({ auctionId: createDto.auctionId });

    return res.status(200).json({
      status: 'success',
      message: 'Room created',
      bids: bidsList,
    });
  }
}

