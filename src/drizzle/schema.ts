import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  uniqueIndex,
  date,
  boolean,
} from 'drizzle-orm/pg-core';

// Bảng Users (2. Auth)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).unique(), // Có thể null nếu đăng nhập bằng phone
  passwordHash: text('password_hash'), // Có thể null nếu đăng nhập bằng Google hoặc phone
  displayName: varchar('display_name', { length: 256 }),
  googleId: varchar('google_id', { length: 256 }).unique(), // ID từ Google OAuth
  phone: varchar('phone', { length: 20 }).unique(), // Số điện thoại cho Phone Auth
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Bảng Events (3. Tạo Event)
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  userId: serial('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(), // Khóa ngoại tới user
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'),

  // Ngày Âm Lịch (Ngày, Tháng, Năm - Dựa trên Hồ Ngọc Đức)
  lunarDay: date('lunar_day', { mode: 'string' }).notNull(), // Lưu dưới dạng YYYY-MM-DD

  // Có thể thêm ngày Dương Lịch tương ứng để dễ query
  solarDate: date('solar_date', { mode: 'string' }).notNull(),

  // Loại sự kiện (Ví dụ: Công việc, Cá nhân, Lễ hội)
  type: varchar('type', { length: 50 }).default('personal'),

  isPrivate: boolean('is_private').default(true),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Bảng Calendar Data (1. Dữ liệu Lịch Âm) - Dữ liệu tĩnh
// Dữ liệu này thường được xử lý ở frontend hoặc import 1 lần.
// Nếu muốn lưu trữ các thông tin như Can Chi, Tiết Khí...
export const calendarData = pgTable('calendar_data', {
  id: serial('id').primaryKey(),
  solarDate: date('solar_date', { mode: 'string' }).notNull().unique(), // Ngày Dương Lịch YYYY-MM-DD
  lunarDate: date('lunar_date', { mode: 'string' }).notNull(), // Ngày Âm Lịch YYYY-MM-DD
  canChiDay: varchar('can_chi_day', { length: 10 }),
  canChiMonth: varchar('can_chi_month', { length: 10 }),
  canChiYear: varchar('can_chi_year', { length: 10 }),
  // Thêm các trường khác của Lịch Hồ Ngọc Đức như Tiết Khí, Sao Tốt/Xấu...
});
