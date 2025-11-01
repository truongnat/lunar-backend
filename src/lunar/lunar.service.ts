import { Injectable } from '@nestjs/common';
import { LunarDate } from './types';
import { CAN, CHI, TUAN } from './constants';
import { getLunarDate, convertLunar2Solar } from './lunar-utils';

@Injectable()
export class LunarService {
  /**
   * Chuyển đổi ngày dương lịch sang âm lịch
   */
  convertSolar2Lunar(day: number, month: number, year: number): LunarDate {
    return getLunarDate(day, month, year);
  }

  /**
   * Chuyển đổi ngày âm lịch sang dương lịch
   */
  convertLunar2Solar(day: number, month: number, year: number, leap: number = 0): { day: number; month: number; year: number } {
    const [solarDay, solarMonth, solarYear] = convertLunar2Solar(day, month, year, leap);
    return { day: solarDay, month: solarMonth, year: solarYear };
  }

  /**
   * Lấy can chi của năm
   */
  getYearCanChi(year: number): string {
    return `${CAN[(year + 6) % 10]} ${CHI[(year + 8) % 12]}`;
  }

  /**
   * Lấy thứ trong tuần từ ngày dương lịch
   */
  getWeekday(day: number, month: number, year: number): string {
    const date = new Date(year, month - 1, day);
    return TUAN[date.getDay()];
  }

  /**
   * Lấy thông tin âm lịch đầy đủ từ ngày dương lịch
   */
  getLunarInfo(day: number, month: number, year: number): {
    lunar: LunarDate;
    yearCanChi: string;
    weekday: string;
  } {
    const lunar = this.convertSolar2Lunar(day, month, year);
    const yearCanChi = this.getYearCanChi(lunar.year);
    const weekday = this.getWeekday(day, month, year);

    return {
      lunar,
      yearCanChi,
      weekday,
    };
  }
}