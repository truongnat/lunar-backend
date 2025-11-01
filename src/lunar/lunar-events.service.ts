import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventsDto } from './dto/get-events.dto';
import { events } from '../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { LunarService } from './lunar.service';

@Injectable()
export class LunarEventsService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly lunarService: LunarService,
  ) {}

  async create(userId: number, createEventDto: CreateEventDto) {
    const {
      title,
      description,
      lunarDay,
      lunarMonth,
      lunarYear,
      isLeapMonth = false,
      type = 'personal',
      isPrivate = true,
    } = createEventDto;

    // Chuyển đổi ngày âm lịch sang dương lịch để lưu trữ
    const solarDate = this.lunarService.convertLunar2Solar(
      lunarDay,
      lunarMonth,
      lunarYear,
      isLeapMonth ? 1 : 0,
    );

    // Format ngày âm lịch để lưu trữ
    const lunarDateStr = `${lunarYear}-${lunarMonth.toString().padStart(2, '0')}-${lunarDay.toString().padStart(2, '0')}`;

    // Format ngày dương lịch để lưu trữ
    const solarDateStr = `${solarDate.year}-${solarDate.month.toString().padStart(2, '0')}-${solarDate.day.toString().padStart(2, '0')}`;

    // Lưu sự kiện vào database
    const result = await this.drizzleService.db
      .insert(events)
      .values({
        userId,
        title,
        description,
        lunarDay,
        lunarMonth,
        lunarYear,
        isLeapMonth,
        solarDate: solarDateStr,
        type,
        isPrivate,
      })
      .returning();

    return result[0];
  }

  async findAll(userId: number, getEventsDto: GetEventsDto = {}) {
    const { lunarMonth, lunarYear, type } = getEventsDto;

    let query = this.drizzleService.db
      .select()
      .from(events)
      .where(eq(events.userId, userId));

    // Thêm điều kiện lọc theo tháng âm lịch nếu có
    if (lunarMonth) {
      query = this.drizzleService.db
        .select()
        .from(events)
        .where(eq(events.lunarMonth, lunarMonth));
    }

    // Thêm điều kiện lọc theo năm âm lịch nếu có
    if (lunarYear) {
      query = this.drizzleService.db
        .select()
        .from(events)
        .where(eq(events.lunarYear, lunarYear));
    }

    // Thêm điều kiện lọc theo loại sự kiện nếu có
    if (type) {
      query = this.drizzleService.db
        .select()
        .from(events)
        .where(eq(events.type, type));
    }

    return query;
  }

  async findOne(userId: number, id: number) {
    const result = await this.drizzleService.db
      .select()
      .from(events)
      .where(and(eq(events.id, id), eq(events.userId, userId)));

    return result[0];
  }

  async update(userId: number, id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(userId, id);

    if (!event) {
      return null;
    }

    let updateValues: any = { ...updateEventDto };

    // Nếu có cập nhật ngày âm lịch, cần tính lại ngày dương lịch tương ứng
    if (
      updateEventDto.lunarDay ||
      updateEventDto.lunarMonth ||
      updateEventDto.lunarYear ||
      'isLeapMonth' in updateEventDto
    ) {
      const lunarDay = updateEventDto.lunarDay || event.lunarDay;
      const lunarMonth = updateEventDto.lunarMonth || event.lunarMonth;
      const lunarYear = updateEventDto.lunarYear || event.lunarYear;
      const isLeapMonth =
        'isLeapMonth' in updateEventDto
          ? updateEventDto.isLeapMonth
          : event.isLeapMonth;

      // Chuyển đổi ngày âm lịch sang dương lịch
      const solarDate = this.lunarService.convertLunar2Solar(
        lunarDay,
        lunarMonth,
        lunarYear,
        isLeapMonth ? 1 : 0,
      );

      // Format ngày dương lịch để lưu trữ
      const solarDateStr = `${solarDate.year}-${solarDate.month.toString().padStart(2, '0')}-${solarDate.day.toString().padStart(2, '0')}`;

      updateValues = {
        ...updateValues,
        lunarDay,
        lunarMonth,
        lunarYear,
        isLeapMonth,
        solarDate: solarDateStr,
        updatedAt: new Date(),
      };
    }

    const result = await this.drizzleService.db
      .update(events)
      .set(updateValues)
      .where(and(eq(events.id, id), eq(events.userId, userId)))
      .returning();

    return result[0];
  }

  async remove(userId: number, id: number) {
    const result = await this.drizzleService.db
      .delete(events)
      .where(and(eq(events.id, id), eq(events.userId, userId)))
      .returning();

    return result[0];
  }
}
