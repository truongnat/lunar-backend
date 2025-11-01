import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  date,
  boolean,
  integer,
  pgEnum,
  index
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
}, (table) => {
  return {
    emailIdx: index('users_email_idx').on(table.email),
    createdAtIdx: index('users_created_at_idx').on(table.createdAt),
  };
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
  lunarDay: integer('lunar_day').notNull(), // Ngày âm lịch (1-30)
  lunarMonth: integer('lunar_month').notNull(), // Tháng âm lịch (1-12)
  lunarYear: integer('lunar_year').notNull(), // Năm âm lịch
  isLeapMonth: boolean('is_leap_month').default(false), // Có phải tháng nhuận không

  // Có thể thêm ngày Dương Lịch tương ứng để dễ query
  solarDate: date('solar_date', { mode: 'string' }).notNull(),

  // Loại sự kiện (Ví dụ: Công việc, Cá nhân, Lễ hội)
  type: varchar('type', { length: 50 }).default('personal'),

  isPrivate: boolean('is_private').default(true),
  
  reminderDays: integer('reminder_days'), // Số ngày nhắc trước sự kiện

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
}, (table) => {
  return {
    userIdIdx: index('events_user_id_idx').on(table.userId),
    solarDateIdx: index('events_solar_date_idx').on(table.solarDate),
    typeIdx: index('events_type_idx').on(table.type),
  };
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

// Enum cho loại media
export const mediaTypeEnum = pgEnum('media_type', ['image', 'video', 'document', 'icon']);

// Bảng Media (4. Quản lý media)
export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  userId: serial('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(), // Khóa ngoại tới user
  fileName: varchar('file_name', { length: 256 }).notNull(),
  originalName: varchar('original_name', { length: 256 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  size: integer('size').notNull(), // Kích thước file (bytes)
  path: varchar('path', { length: 512 }).notNull(), // Đường dẫn lưu trữ
  type: mediaTypeEnum('type').notNull(), // Loại media (image, video, document, icon)
  description: text('description'),
  isPublic: boolean('is_public').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
}, (table) => {
  return {
    userIdIdx: index('media_user_id_idx').on(table.userId),
    typeIdx: index('media_type_idx').on(table.type),
    createdAtIdx: index('media_created_at_idx').on(table.createdAt),
  };
});
