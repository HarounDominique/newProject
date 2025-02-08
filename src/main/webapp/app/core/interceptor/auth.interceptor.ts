import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StateStorageService } from 'app/core/auth/state-storage.service';
import { ApplicationConfigService } from '../config/application-config.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly stateStorageService = inject(StateStorageService);
  private readonly applicationConfigService = inject(ApplicationConfigService);

  intercept(request: HttpRequest<never>, next: HttpHandler): Observable<HttpEvent<never>> {
    const serverApiUrl = this.applicationConfigService.getEndpointFor('');
    if (!request.url || (request.url.startsWith('http') && !(serverApiUrl && request.url.startsWith(serverApiUrl)))) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return next.handle(request);
    }

    const token: string | null = this.stateStorageService.getAuthenticationToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return next.handle(request);
  }
}
