import { Body, Controller, Get, Post, Query, Version } from '@nestjs/common';
import { LunarService } from './lunar.service';
import { SolarToLunarDto } from './dto/solar-to-lunar.dto';
import { LunarToSolarDto } from './dto/lunar-to-solar.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Lunar Calendar')
@Controller('lunar')
export class LunarController {
  constructor(private readonly lunarService: LunarService) {}

  @Post('solar-to-lunar')
  @Version('1')
  @ApiOperation({ summary: 'Convert solar date to lunar date' })
  @ApiResponse({ status: 200, description: 'Returns the lunar date for the given solar date' })
  @ApiBody({ type: SolarToLunarDto })
  convertSolarToLunar(@Body() solarToLunarDto: SolarToLunarDto) {
    const { day, month, year } = solarToLunarDto;
    return this.lunarService.convertSolar2Lunar(day, month, year);
  }

  @Post('lunar-to-solar')
  @Version('1')
  @ApiOperation({ summary: 'Convert lunar date to solar date' })
  @ApiResponse({ status: 200, description: 'Returns the solar date for the given lunar date' })
  @ApiBody({ type: LunarToSolarDto })
  convertLunarToSolar(@Body() lunarToSolarDto: LunarToSolarDto) {
    const { day, month, year, leap } = lunarToSolarDto;
    return this.lunarService.convertLunar2Solar(day, month, year, leap ? 1 : 0);
  }

  @Get('info')
  @ApiOperation({ summary: 'Get lunar date information' })
  @ApiResponse({ status: 200, description: 'Returns detailed information about the lunar date' })
  getLunarInfo(@Query() solarToLunarDto: SolarToLunarDto) {
    const { day, month, year } = solarToLunarDto;
    return this.lunarService.getLunarInfo(day, month, year);
  }
}