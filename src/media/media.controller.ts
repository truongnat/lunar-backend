import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { GetMediaDto } from './dto/get-media.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { HttpCacheInterceptor } from '../cache/interceptors/http-cache.interceptor';
import { CacheKey } from '../cache/decorators/cache-key.decorator';

@ApiTags('Media')
@Controller('media')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a new media file' })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully uploaded.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        type: {
          type: 'string',
          enum: ['image', 'video', 'document', 'icon'],
        },
        description: {
          type: 'string',
        },
        isPublic: {
          type: 'boolean',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @User('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() createMediaDto: CreateMediaDto,
  ) {
    return this.mediaService.create(userId, file, createMediaDto);
  }

  @Post('upload/image')
  @ApiOperation({ summary: 'Upload a new image file' })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully uploaded.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        description: {
          type: 'string',
        },
        isPublic: {
          type: 'boolean',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @User('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.mediaService.createImage(file);
  }

  @Get()
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey('media-all')
  @ApiOperation({ summary: 'Get all media files' })
  @ApiResponse({
    status: 200,
    description: 'Returns all media files for the user',
  })
  findAll(@User('id') userId: string, @Query() getMediaDto: GetMediaDto) {
    return this.mediaService.findAll(userId, getMediaDto);
  }

  @Get(':id')
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey('media-one')
  @ApiOperation({ summary: 'Get a specific media file' })
  @ApiResponse({ status: 200, description: 'Returns the specified media file' })
  findOne(@User('id') userId: string, @Param('id') id: string) {
    return this.mediaService.findOne(userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a media file' })
  @ApiResponse({
    status: 200,
    description: 'The media file has been successfully updated.',
  })
  update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    return this.mediaService.update(userId, id, updateMediaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a media file' })
  @ApiResponse({
    status: 200,
    description: 'The media file has been successfully deleted.',
  })
  remove(@User('id') userId: string, @Param('id') id: string) {
    return this.mediaService.remove(userId, id);
  }
}
