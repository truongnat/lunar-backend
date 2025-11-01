/**
 * Copyright 2004 Ho Ngoc Duc [http://come.to/duc]. All Rights Reserved.
 * Permission to use, copy, modify, and redistribute this software and its
 * documentation for personal, non-commercial use is hereby granted provided that
 * this copyright notice appears in all copies.
 * Converted to TypeScript by Lunar Calendar Project
 */

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  leap: number;
  jd: number;
}

export interface OutputOptions {
  fontSize: string;
  tableWidth: string;
}