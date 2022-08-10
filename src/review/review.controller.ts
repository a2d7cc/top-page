import { IdValidationPipe } from './../pipes/id-validation.pipe';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model';
import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserEmail } from 'src/decorators/user-email.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly ReviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.ReviewService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = await this.ReviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      return deletedDoc;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId') productId: string,
    @UserEmail() email: string,
  ) {
    return this.ReviewService.findByProductId(productId);
  }
}
