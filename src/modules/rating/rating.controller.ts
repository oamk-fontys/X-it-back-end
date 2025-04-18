import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseBoolPipe,
    Post,
    Put,
    Query,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { MinimalRoomDto } from '../room/dto/minimal-room.dto';
import { MinimalUserDto } from '../user/dto/minimal-user.dto';
import { RatingService } from './rating.service';
import { RatingDto } from './dto/rating.dto';
import { CreateRatingDto } from './dto/create-rating.dto';
import { EditRatingDto } from './dto/edit-rating.dto';

@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) { }

    @Get(':roomId')
    @ApiOkResponse({
        description: 'Get all ratings by room ID',
        type: RatingDto,
        isArray: true,
    })
    @UseInterceptors(
        new ResponseInterceptor(RatingDto, {
            user: MinimalUserDto,
            room: MinimalRoomDto,
        }),
    )
    async getComments(
        @Param('roomId') roomId: string,
    ) {
        return this.ratingService.getRatings(roomId);
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Get one rating by ID',
        type: RatingDto,
    })
    @UseInterceptors(
        new ResponseInterceptor(RatingDto, {
            user: MinimalUserDto,
            room: MinimalRoomDto,
        }),
    )
    async getRatingById(@Param('id') id: string) {
        return this.ratingService.getRatingById(id);
    }

    @Get('user')
    @ApiOkResponse({
        description: 'Get all ratings for user',
        type: RatingDto,
        isArray: true,
    })
    @IsAuthenticated([Role.USER])
    @UseInterceptors(
        new ResponseInterceptor(RatingDto, {
            user: MinimalUserDto,
            room: MinimalRoomDto,
        }),
    )
    async getAllRatingsByUserId(@Req() req: RequestWithUser) {
        console.log('User info from request:', req.user); // Log de user-info
        const ratings = await this.ratingService.getAllRatingsByUserId(req.user.id);
        console.log('Ratings returned to client:', ratings); // Log de ratings voordat ze worden geretourneerd
        return ratings;
    }

    @Post()
    @ApiOkResponse({
        description: 'Create a rating',
        type: RatingDto,
    })
    @IsAuthenticated([Role.USER, Role.ADMIN])
    @UseInterceptors(
        new ResponseInterceptor(RatingDto, {
            user: MinimalUserDto,
            room: MinimalRoomDto,
        }),
    )
    async createRating(
        @Body() body: CreateRatingDto,
        @Req() request: RequestWithUser,
    ) {
        return this.ratingService.createRating(body, request.user.id);
    }

    @Put(':id')
    @ApiOkResponse({
        description: 'Update a rating',
        type: RatingDto,
    })
    @IsAuthenticated([Role.USER, Role.ADMIN])
    @UseInterceptors(
        new ResponseInterceptor(RatingDto, {
            user: MinimalUserDto,
            room: MinimalRoomDto,
        }),
    )
    async updateRating(
        @Param('id') id: string,
        @Body() body: EditRatingDto,
        @Req() request: RequestWithUser,
    ) {
        return this.ratingService.updateRating(id, body, request.user.id);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Delete a rating',
        type: RatingDto,
    })
    @IsAuthenticated([Role.USER, Role.ADMIN])
    @UseInterceptors(
        new ResponseInterceptor(RatingDto, {
            user: MinimalUserDto,
            room: MinimalRoomDto,
        }),
    )
    async deleteRating(
        @Param('id') id: string,
        @Req() request: RequestWithUser,
    ) {
        return this.ratingService.deleteRating(id, request.user.id);
    }
}
