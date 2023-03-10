import {
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  Req,
  Body,
  UseInterceptors,
  UploadedFiles,
  Param,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuctionService } from './auction.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAuctionDto } from './dtos/create.dto';
import { ValidationService } from '../validation/validation.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../files/files.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Auctions')
@Controller('auctions')
export class AuctionController {
  constructor(
    private readonly auctionService: AuctionService,
    private readonly validationService: ValidationService,
    private readonly filesService: FilesService,
  ) {}

  @ApiOperation({ summary: 'Get auctions list' })
  @ApiResponse({ status: 200, type: [CreateAuctionDto] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const query = {
      page: req.query?.page && Number(req.query?.page) || 1,
      limit: req.query?.limit && Number(req.query?.limit) || 10,
    }

    return res.status(200).json(await this.auctionService.findAll(query));
  }

  @ApiOperation({ summary: 'Get auction by id' })
  @ApiResponse({ status: 200, type: CreateAuctionDto })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getRoomById(@Param('id') id: number) {
    return this.auctionService.findOne({ id });
  }

  @ApiOperation({ summary: 'Create auction' })
  @ApiResponse({ status: 200, type: CreateAuctionDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images' }, { name: 'video' }]),
  )
  async create(
    @Req() req: Request,
    @Body() createDto: CreateAuctionDto,
    @Res() res: Response,
    @UploadedFiles() files,
  ) {
    const errors = await this.validationService.validate(
      CreateAuctionDto,
      createDto,
    );

    if (errors.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid fields',
        errors,
      });
    }

    const { title } = createDto;
    const auction = await this.auctionService.findOne({ title });

    if (auction) {
      return res.status(400).json({
        status: 'error',
        message: `Auction with this title already exist`,
        field: 'title',
      });
    }

    const videoName = this.filesService.createFile(files.video[0], 'video');
    const imageNames = files.images.map(image => this.filesService.createFile(image, 'images'));

    await this.auctionService.create(req, {
      ...createDto,
      images: imageNames,
      video: videoName,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Auction has benn created successful',
    });
  }
}
