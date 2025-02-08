import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AlertService } from 'app/core/util/alert.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  private readonly alertService = inject(AlertService);

  intercept(request: HttpRequest<never>, next: HttpHandler): Observable<HttpEvent<never>> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return next.handle(request).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let alert: string | null = null;
          let alertParams: string | null = null;

          for (const headerKey of event.headers.keys()) {
            if (headerKey.toLowerCase().endsWith('app-alert')) {
              alert = event.headers.get(headerKey);
            } else if (headerKey.toLowerCase().endsWith('app-params')) {
              alertParams = decodeURIComponent(event.headers.get(headerKey)!.replace(/\+/g, ' '));
            }
          }

          if (alert) {
            this.alertService.addAlert({
              type: 'success',
              translationKey: alert,
              translationParams: { param: alertParams },
            });
          }
        }
      }),
    );
  }
}
