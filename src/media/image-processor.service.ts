import * as fs from 'fs/promises';
import * as path from 'path';
import sharp from 'sharp';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

const FIXED_SIZES = [
  { name: 'tiny', width: 100, quality: 75 },
  { name: 'medium', width: 800, quality: 85 },
  { name: 'large', width: 1200, quality: 90 },
];

const UPLOADS_ROOT = path.join(process.cwd(), 'uploads');
const BASE_UPLOAD_DIR = path.join(UPLOADS_ROOT, 'images'); // Thư mục gốc chứa tất cả ảnh

@Injectable()
export class ImageProcessorService {
  /**
   * Xử lý file, tạo thư mục con bằng UUID và lưu trữ các phiên bản ảnh.
   * @param originalFile Đối tượng file từ Multer.
   * @returns Một object chứa ID thư mục (folderName) và các URL của ảnh đã được xử lý.
   */
  async processAndResize(
    originalFile: Express.Multer.File,
  ): Promise<Record<string, string>> {
    // 1. Dùng UUID làm tên folder duy nhất
    const folderName = uuidv4();
    const targetFolder = path.join(BASE_UPLOAD_DIR, folderName);
    const results: Record<string, string> = { folderName };

    // 2. Đảm bảo thư mục đích đã tồn tại
    await fs.mkdir(targetFolder, { recursive: true });

    // 3. Xử lý và lưu trữ file Gốc (Original)
    const originalExt = path.extname(originalFile.filename);
    const originalFilename = `original${originalExt}`; // Tên file: original.jpg/png
    const originalPath = path.join(targetFolder, originalFilename);

    // Di chuyển file gốc vào thư mục mới
    await fs.rename(originalFile.path, originalPath);
    results['original'] = `/uploads/images/${folderName}/${originalFilename}`;

    // 4. Lặp qua các cấu hình kích thước và xử lý
    for (const sizeConfig of FIXED_SIZES) {
      // Tên file đầu ra: tiny.webp / medium.webp
      const outputFilename = `${sizeConfig.name}.webp`;
      const outputPath = path.join(targetFolder, outputFilename);

      await sharp(originalPath) // Sử dụng file gốc đã di chuyển
        .resize({ width: sizeConfig.width, fit: sharp.fit.inside })
        .webp({ quality: sizeConfig.quality }) // Chuyển sang WebP
        .toFile(outputPath);

      // Lưu URL để trả về cho API (sử dụng đường dẫn thư mục và tên file mới)
      results[sizeConfig.name] =
        `/uploads/images/${folderName}/${outputFilename}`;
    }

    return results;
  }
}
