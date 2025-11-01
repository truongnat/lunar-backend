import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { CreateMediaDto, MediaType } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { GetMediaDto } from './dto/get-media.dto';
import { media } from '../drizzle/schema';
import { and, eq } from 'drizzle-orm';
import * as fs from 'fs';
import { ImageProcessorService } from './image-processor.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly imageProcessor: ImageProcessorService,
  ) {}

  async create(
    userId: string,
    file: Express.Multer.File,
    createMediaDto: CreateMediaDto,
  ) {
    const { type, description, isPublic = false } = createMediaDto;

    const result = await this.drizzleService.db
      .insert(media)
      .values({
        userId,
        fileName: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
        type,
        description,
        isPublic,
        updatedAt: new Date(),
      })
      .returning();

    return result[0];
  }

  async createImage(file: Express.Multer.File) {
    return await this.imageProcessor.processAndResize(file);
  }

  async findAll(userId: string, getMediaDto: GetMediaDto = {}) {
    const { type, isPublic } = getMediaDto;
    const mediaQuery = this.drizzleService.db.select().from(media);
    let query = mediaQuery.where(eq(media.userId, userId));

    if (type) {
      query = mediaQuery.where(eq(media.type, type));
    }

    if (isPublic !== undefined) {
      query = mediaQuery.where(eq(media.isPublic, isPublic));
    }

    return query;
  }

  async findOne(userId: string, id: string) {
    const result = await this.drizzleService.db
      .select()
      .from(media)
      .where(and(eq(media.id, id), eq(media.userId, userId)));

    if (!result.length) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    return result[0];
  }

  async update(userId: string, id: string, updateMediaDto: UpdateMediaDto) {
    const mediaItem = await this.findOne(userId, id);

    if (!mediaItem) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    const updateValues = {
      ...updateMediaDto,
      updatedAt: new Date(),
    };

    const result = await this.drizzleService.db
      .update(media)
      .set(updateValues)
      .where(and(eq(media.id, id), eq(media.userId, userId)))
      .returning();

    return result[0];
  }

  async remove(userId: string, id: string) {
    const mediaItem = await this.findOne(userId, id);

    if (!mediaItem) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    // Xóa file từ hệ thống
    try {
      fs.unlinkSync(mediaItem.path);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
    }

    // Xóa bản ghi từ database
    await this.drizzleService.db
      .delete(media)
      .where(and(eq(media.id, id), eq(media.userId, userId)));

    return { success: true, message: 'Media deleted successfully' };
  }

  getMediaUrl(fileName: string): string {
    return `/uploads/${fileName}`;
  }
}
