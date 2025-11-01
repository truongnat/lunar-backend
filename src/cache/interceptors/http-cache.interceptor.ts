import { Injectable, ExecutionContext } from '@nestjs/common';
import { CACHE_KEY_METADATA } from '../decorators/cache-key.decorator';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;
    const isGetRequest = request.method === 'GET';

    // Không cache cho các request không phải GET
    if (isGetRequest) {
      return undefined;
    }

    // Lấy cache key từ metadata nếu có
    const cacheKey = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    if (cacheKey) {
      return `${cacheKey}:${request.url}`;
    }

    // Thêm userId vào cache key nếu có
    let userId = '';
    if (request.user && request.user.id) {
      userId = `:user-${request.user.id}`;
    }

    return httpAdapter.getRequestUrl(request) + userId;
  }
}
