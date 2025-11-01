import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { LunarEventsService } from './lunar-events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventsDto } from './dto/get-events.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('Lunar Events')
@Controller('lunar/events')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LunarEventsController {
  constructor(private readonly lunarEventsService: LunarEventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lunar event' })
  @ApiResponse({ status: 201, description: 'The event has been successfully created.' })
  @ApiBody({ type: CreateEventDto })
  create(@User('id') userId: number, @Body() createEventDto: CreateEventDto) {
    return this.lunarEventsService.create(userId, createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lunar events' })
  @ApiResponse({ status: 200, description: 'Returns all lunar events for the user' })
  findAll(@User('id') userId: number, @Query() getEventsDto: GetEventsDto) {
    return this.lunarEventsService.findAll(userId, getEventsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific lunar event' })
  @ApiResponse({ status: 200, description: 'Returns the specified lunar event' })
  findOne(@User('id') userId: number, @Param('id', ParseIntPipe) id: number) {
    return this.lunarEventsService.findOne(userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a lunar event' })
  @ApiResponse({ status: 200, description: 'The event has been successfully updated.' })
  @ApiBody({ type: UpdateEventDto })
  update(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.lunarEventsService.update(userId, id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lunar event' })
  @ApiResponse({ status: 200, description: 'The event has been successfully deleted.' })
  remove(@User('id') userId: number, @Param('id', ParseIntPipe) id: number) {
    return this.lunarEventsService.remove(userId, id);
  }
}