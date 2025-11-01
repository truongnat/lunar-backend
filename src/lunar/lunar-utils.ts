import { LunarDate } from './types';
import { TK19, TK20, TK21, TK22, FIRST_DAY, LAST_DAY } from './constants';

export function INT(d: number): number {
  return Math.floor(d);
}

export function jdn(dd: number, mm: number, yy: number): number {
  const a = INT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  const jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
  return jd;
}

export function jdn2date(jd: number): [number, number, number] {
  let Z, A, alpha, B, C, D, E, dd, mm, yyyy;
  Z = jd;
  if (Z < 2299161) {
    A = Z;
  } else {
    alpha = INT((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - INT(alpha / 4);
  }
  B = A + 1524;
  C = INT((B - 122.1) / 365.25);
  D = INT(365.25 * C);
  E = INT((B - D) / 30.6001);
  dd = INT(B - D - INT(30.6001 * E));
  if (E < 14) {
    mm = E - 1;
  } else {
    mm = E - 13;
  }
  if (mm < 3) {
    yyyy = C - 4715;
  } else {
    yyyy = C - 4716;
  }
  return [dd, mm, yyyy];
}

export function decodeLunarYear(yy: number, k: number): LunarDate[] {
  const monthLengths = [29, 30];
  const regularMonths = new Array(12);
  const offsetOfTet = k >> 17;
  const leapMonth = k & 0xf;
  const leapMonthLength = monthLengths[k >> 16 & 0x1];
  const solarNY = jdn(1, 1, yy);
  let currentJD = solarNY + offsetOfTet;
  let j = k >> 4;
  
  for (let i = 0; i < 12; i++) {
    regularMonths[12 - i - 1] = monthLengths[j & 0x1];
    j >>= 1;
  }
  
  const ly: LunarDate[] = [];
  
  if (leapMonth === 0) {
    for (let mm = 1; mm <= 12; mm++) {
      ly.push({
        day: 1,
        month: mm,
        year: yy,
        leap: 0,
        jd: currentJD
      });
      currentJD += regularMonths[mm - 1];
    }
  } else {
    for (let mm = 1; mm <= leapMonth; mm++) {
      ly.push({
        day: 1,
        month: mm,
        year: yy,
        leap: 0,
        jd: currentJD
      });
      currentJD += regularMonths[mm - 1];
    }
    ly.push({
      day: 1,
      month: leapMonth,
      year: yy,
      leap: 1,
      jd: currentJD
    });
    currentJD += leapMonthLength;
    for (let mm = leapMonth + 1; mm <= 12; mm++) {
      ly.push({
        day: 1,
        month: mm,
        year: yy,
        leap: 0,
        jd: currentJD
      });
      currentJD += regularMonths[mm - 1];
    }
  }
  
  return ly;
}

export function getYearInfo(yyyy: number): LunarDate[] {
  let yearCode;
  
  if (yyyy < 1900) {
    yearCode = TK19[yyyy - 1800];
  } else if (yyyy < 2000) {
    yearCode = TK20[yyyy - 1900];
  } else if (yyyy < 2100) {
    yearCode = TK21[yyyy - 2000];
  } else {
    yearCode = TK22[yyyy - 2100];
  }
  
  return decodeLunarYear(yyyy, yearCode);
}

export function findLunarDate(jd: number, ly: LunarDate[]): LunarDate {
  if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd) {
    return {
      day: 0,
      month: 0,
      year: 0,
      leap: 0,
      jd: jd
    };
  }
  
  let i = ly.length - 1;
  while (jd < ly[i].jd) {
    i--;
  }
  
  const off = jd - ly[i].jd;
  return {
    day: ly[i].day + off,
    month: ly[i].month,
    year: ly[i].year,
    leap: ly[i].leap,
    jd: jd
  };
}

export function getLunarDate(dd: number, mm: number, yyyy: number): LunarDate {
  if (yyyy < 1800 || 2199 < yyyy) {
    return {
      day: 0,
      month: 0,
      year: 0,
      leap: 0,
      jd: 0
    };
  }
  
  let ly = getYearInfo(yyyy);
  const jd = jdn(dd, mm, yyyy);
  
  if (jd < ly[0].jd) {
    ly = getYearInfo(yyyy - 1);
  }
  
  return findLunarDate(jd, ly);
}

export function convertLunar2Solar(lunarDay: number, lunarMonth: number, lunarYear: number, lunarLeap: number): [number, number, number] {
  let ly = getYearInfo(lunarYear);
  
  if (lunarMonth < 1 || lunarMonth > 12) {
    return [0, 0, 0];
  }
  
  let lunarInfo: LunarDate | null = null;
  let leap = lunarLeap === 1;
  
  for (let i = 0; i < ly.length; i++) {
    if (ly[i].month === lunarMonth && ly[i].leap === (leap ? 1 : 0)) {
      lunarInfo = ly[i];
      break;
    }
  }
  
  if (lunarInfo === null) {
    return [0, 0, 0];
  }
  
  const lunarInfoIndex = ly.findIndex(item => item.jd === lunarInfo!.jd);
  const monthDays = (lunarInfo.month === ly[ly.length - 1].month) 
    ? LAST_DAY - lunarInfo.jd + 1 
    : ly[lunarInfoIndex + 1].jd - lunarInfo.jd;
  
  if (lunarDay < 1 || lunarDay > monthDays) {
    return [0, 0, 0];
  }
  
  const jd = lunarInfo.jd + lunarDay - 1;
  return jdn2date(jd);
}